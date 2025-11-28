// components/careers/job-card.tsx
"use client"

import * as React from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Locale = "en" | "ar" | "tr"

type Job = {
    id: string
    title: string
    short: string
    tags?: string[]
    email?: string
    description: string
}

export default function JobCard({
    job,
    locale,
    aosDelay = 0,
    labels,
}: {
    job: Job
    locale: Locale
    aosDelay?: number
    labels: { readMore: string; apply: string }
}) {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        AOS.init({ duration: 600, once: true, offset: 36, easing: "ease-out-cubic" })
    }, [])

    const mail = job.email || "careers@company.com"
    const subject = encodeURIComponent(`[${job.title}] Application`)
    const body = encodeURIComponent(`Hello,\n\nI would like to apply for "${job.title}".\n\nRegards,\n`)
    const mailtoHref = `mailto:${mail}?subject=${subject}&body=${body}`

    return (
        <article
            className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
            data-aos="fade-up"
            data-aos-delay={aosDelay}
        >
            {/* محتوای کارت: فلکس ستونی تا دکمه‌ها برن ته کارت */}
            <div className="p-6 flex flex-col h-full">
                {/* عنوان + خلاصه */}
                <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground mt-2">
                        {job.short}
                    </p>
                    {/* خط جداکننده زیر عنوان/خلاصه */}
                    <div className="border-t border-border/60 mt-4" />
                </div>

                {/* تگ‌ها (اختیاری) */}
                {job.tags && job.tags.length > 0 && (
                    <div className="pt-4 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
                        ))}
                    </div>
                )}

                {/* Divider قبل از اکشن‌ها برای نظم بهتر */}
                <div className="border-t border-border/60 mt-5" />

                {/* دکمه‌ها همیشه پایین کارت */}
                <div className="mt-auto pt-5 flex items-center gap-3">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">{labels.readMore}</Button>
                        </DialogTrigger>

                        {/* مودال مینیمال با Dividerها؛ بدون گرادیان/سایه اضافه */}
                        <DialogContent className="max-w-2xl p-0 overflow-hidden">
                            <DialogHeader className="px-6 pt-6">
                                <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                                <DialogDescription className="text-base text-muted-foreground">{job.short}</DialogDescription>
                            </DialogHeader>

                            {/* خط جداکننده بین هدر و بدنه */}
                            <div className="border-t border-border/60 mt-4" />

                            {/* تگ‌ها در مودال (در صورت نیاز) */}
                            {job.tags && job.tags.length > 0 && (
                                <div className="px-6 pt-4 flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
                                    ))}
                                </div>
                            )}

                            {/* بدنه توضیحات */}
                            <div className="px-6 py-5">
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <p style={{ whiteSpace: "pre-line" }}>{job.description}</p>
                                </div>
                            </div>

                            {/* Divider قبل از فوتر */}
                            <div className="border-t border-border/60" />

                            {/* فوتر ساده */}
                            <div className="px-6 py-4 flex items-center justify-end gap-3">
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    {locale === "ar" ? "إغلاق" : locale === "tr" ? "Kapat" : "Close"}
                                </Button>
                                <a href={mailtoHref}>
                                    <Button>{labels.apply}</Button>
                                </a>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <a href={mailtoHref}>
                        <Button>{labels.apply}</Button>
                    </a>
                </div>
            </div>
        </article>
    )
}
