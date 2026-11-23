import type { QuartzTransformerPlugin } from "@quartz-community/types"

function remarkMentions() {
  return (tree: any) => {
    function processChildren(parent: any) {
      if (!Array.isArray(parent.children)) return

      const result: any[] = []

      for (const node of parent.children) {
        if (node.type !== "text") {
          processChildren(node)
          result.push(node)
          continue
        }

        const regex = /@([\p{L}\p{N}_-]+)/gu
        const value = node.value as string
        let lastIndex = 0
        let match: RegExpExecArray | null

        while ((match = regex.exec(value)) !== null) {
          const start = match.index
          const previous = start > 0 ? value[start - 1] : ""

          // Do not format email addresses or mentions inside words
          if (previous && /[\p{L}\p{N}._%+-]/u.test(previous)) {
            continue
          }

          if (start > lastIndex) {
            result.push({
              type: "text",
              value: value.slice(lastIndex, start),
            })
          }

          result.push({
            type: "mention",
            data: {
              hName: "span",
              hProperties: {
                className: ["mention"],
              },
            },
            children: [
              {
                type: "text",
                value: match[0],
              },
            ],
          })

          lastIndex = regex.lastIndex
        }

        if (lastIndex < value.length) {
          result.push({
            type: "text",
            value: value.slice(lastIndex),
          })
        }
      }

      parent.children = result
    }

    processChildren(tree)
  }
}

export const Mentions: QuartzTransformerPlugin = () => ({
  name: "Mentions",
  markdownPlugins() {
    return [remarkMentions]
  },
})

