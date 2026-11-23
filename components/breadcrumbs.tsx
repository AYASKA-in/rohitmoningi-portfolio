import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <><JsonLd data={breadcrumbSchema(items)} /><nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={item.href}>{index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.href}>{item.name}</Link>}</li>)}</ol></nav></>;
}
