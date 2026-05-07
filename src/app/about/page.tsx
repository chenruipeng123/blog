import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "关于",
  description: `关于${SITE.title}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">关于</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          这里记录工作中踩过的技术坑，以及从坑里爬出来的方法。
        </p>
        <p>
          技术领域涵盖后端开发、容器化、分布式系统、数据库优化等。
          每一篇文章都来源于真实的生产环境问题。
        </p>
      </div>
    </div>
  );
}
