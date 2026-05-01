"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { mdxComponents } from "@/lib/mdx";

export function MdxRenderer({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
