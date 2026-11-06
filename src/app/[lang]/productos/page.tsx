import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProductsFolder from "@/components/ProductsFolder";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/productos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "products", "/productos");
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/productos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).products;

  return (
    <PageShell lang={lang} active="products" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <PageIntro eyebrow={t.eyebrow} title={t.title} className="min-w-0 lg:min-w-[280px] lg:flex-[0_1_340px] lg:self-center">
        <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro1}</p>
        <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro2}</p>
      </PageIntro>
      <ProductsFolder t={t} lang={lang} />
    </PageShell>
  );
}
