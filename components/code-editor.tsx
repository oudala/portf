"use client"

import { useEffect, useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function CodeEditor({ value, onChange, language = "javascript", height = "300px" }: CodeEditorProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full overflow-auto rounded-b-md bg-muted p-4 font-mono text-sm" style={{ height }}>
        {value}
      </div>
    )
  }

  return (
    <div
      className={`relative w-full overflow-auto rounded-b-md font-mono text-sm ${
        focused ? "ring-1 ring-primary/50" : ""
      }`}
      style={{ height }}
    >
      <Highlight theme={theme === "dark" ? themes.nightOwl : themes.github} code={value} language={language as any}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} h-full overflow-auto p-4`} style={{ ...style, margin: 0, height: "100%" }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              // Extract key from lineProps
              const { key: lineKey, ...restLineProps } = lineProps

              return (
                <div key={lineKey} {...restLineProps}>
                  <span className="mr-4 inline-block w-5 select-none text-right opacity-50">{i + 1}</span>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key })
                    // Extract key from tokenProps
                    const { key: tokenKey, ...restTokenProps } = tokenProps

                    return <span key={tokenKey} {...restTokenProps} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent p-4 font-mono text-sm text-transparent caret-primary outline-none"
        style={{
          caretWidth: "1px",
          paddingLeft: "2.5rem", // Adjust to match the line number width
        }}
        spellCheck="false"
      />
    </div>
  )
}
