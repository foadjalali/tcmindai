"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Props = {
    locale: "en" | "ar" | "tr"
    categories: string[]
    sectionClassName?: string
    sectionStyle?: React.CSSProperties
    cardClassName?: string
}

const dict = {
    en: {
        title: "Didn't find your question?",
        subtitle: "Send us your question and we’ll get back to you.",
        name: "Name (optional)",
        email: "Email",
        category: "Category",
        yourQuestion: "Your question",
        consent: "Please contact me back about this question",
        submit: "Send",
        success: "Thanks! We received your question.",
        error: "Something went wrong. Please try again.",
        placeholderQ: "Briefly describe your question...",
    },
    ar: {
        title: "لم تجد سؤالك؟",
        subtitle: "أرسل سؤالك وسنعاود التواصل معك.",
        name: "الاسم (اختياري)",
        email: "البريد الإلكتروني",
        category: "الفئة",
        yourQuestion: "سؤالك",
        consent: "يرجى التواصل معي بخصوص هذا السؤال",
        submit: "إرسال",
        success: "شكراً! استلمنا سؤالك.",
        error: "حدث خطأ. حاول مرة أخرى.",
        placeholderQ: "صف سؤالك باختصار...",
    },
    tr: {
        title: "Sorunuz listede yok mu?",
        subtitle: "Sorunuzu bize gönderin, size dönüş yapalım.",
        name: "Ad (opsiyonel)",
        email: "E-posta",
        category: "Kategori",
        yourQuestion: "Sorunuz",
        consent: "Bu soruyla ilgili benimle iletişime geçin",
        submit: "Gönder",
        success: "Teşekkürler! Sorunuzu aldık.",
        error: "Bir hata oluştu. Lütfen tekrar deneyin.",
        placeholderQ: "Sorunuzu kısaca açıklayın...",
    },
}

export default function AskQuestionSection({
    locale,
    categories,
    sectionClassName,
    sectionStyle,
    cardClassName,
}: Props) {
    const t = dict[locale] ?? dict.en
    const [loading, setLoading] = React.useState(false)
    const [ok, setOk] = React.useState<string | null>(null)
    const [err, setErr] = React.useState<string | null>(null)
    const [cat, setCat] = React.useState<string | undefined>(categories[0])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setOk(null); setErr(null); setLoading(true)

        const fd = new FormData(e.currentTarget)
        if ((fd.get("company") as string)?.length) { setLoading(false); return }

        const payload = {
            name: fd.get("name") as string,
            email: (fd.get("email") as string)?.trim(),
            category: cat,
            question: (fd.get("question") as string)?.trim(),
            consent: fd.get("consent") === "on",
            locale,
        }

        try {
            const res = await fetch("/api/faq-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error(await res.text())
            setOk(t.success)
            e.currentTarget.reset()
        } catch {
            setErr(t.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section
            className={cn("py-16 px-4", sectionClassName)}
            style={sectionStyle}
        >
            <div className="container mx-auto max-w-6xl">
                <div
                    className={cn(
                        "rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm",
                        cardClassName
                    )}
                    data-aos="fade-up"
                >
                    <h3 className="text-2xl font-semibold">{t.title}</h3>
                    <p className="text-muted-foreground mt-1 mb-6">{t.subtitle}</p>

                    {ok && <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-700">{ok}</div>}
                    {err && <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">{err}</div>}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <Label htmlFor="name" className="mb-1.5 block">{t.name}</Label>
                                <Input id="name" name="name" placeholder="John Doe" />
                            </div>
                            <div>
                                <Label htmlFor="email" className="mb-1.5 block">{t.email}</Label>
                                <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <Label className="mb-1.5 block">{t.category}</Label>
                                <Select value={cat} onValueChange={setCat}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t.category} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="question" className="mb-1.5 block">{t.yourQuestion}</Label>
                            <Textarea id="question" name="question" required placeholder={t.placeholderQ} className="min-h-[120px]" />
                        </div>

                        <div className="flex items-start gap-2">
                            <Checkbox id="consent" name="consent" className="mt-0.5" />
                            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-snug">
                                {t.consent}
                            </Label>
                        </div>

                        <Button type="submit" disabled={loading} className="mt-2">
                            {loading ? "..." : t.submit}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
