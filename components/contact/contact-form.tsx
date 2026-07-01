"use client"

import * as React from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function ContactForm({ locale }: { locale: "en" | "ar" | "tr" }) {
    React.useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 40, easing: "ease-out-cubic" })
    }, [])

    const t = {
        en: {
            sendMessage: "Send a Message",
            desc: "Tell us a bit about your needs. We’ll reach out soon.",
            personType: "I am contacting as",
            individual: "Individual",
            company: "Company",
            companyName: "Company name",
            companyWebsite: "Company website (optional)",
            companySize: "Company size",
            subject: "Subject",
            other: "Other",
            customSubject: "Custom subject",
            name: "Your name",
            email: "Your email",
            phone: "Phone (optional)",
            message: "Your message",
            submit: "Send",
            sending: "Sending...",
            success: "Thanks. Your message has been sent.",
            error: "We could not send your message. Please try again.",
            required: "This field is required.",
            invalidEmail: "Enter a valid email address.",
        },
        ar: {
            sendMessage: "أرسل رسالة",
            desc: "أخبرنا عن احتياجاتك وسنتواصل معك قريباً.",
            personType: "أتواصل بصفتي",
            individual: "فرد",
            company: "شركة",
            companyName: "اسم الشركة",
            companyWebsite: "موقع الشركة (اختياري)",
            companySize: "حجم الشركة",
            subject: "الموضوع",
            other: "أخرى",
            customSubject: "موضوع مخصص",
            name: "اسمك",
            email: "بريدك الإلكتروني",
            phone: "الهاتف (اختياري)",
            message: "رسالتك",
            submit: "إرسال",
            sending: "جارٍ الإرسال...",
            success: "شكراً لك. تم إرسال رسالتك.",
            error: "تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى.",
            required: "هذا الحقل مطلوب.",
            invalidEmail: "أدخل بريداً إلكترونياً صحيحاً.",
        },
        tr: {
            sendMessage: "Mesaj Gönder",
            desc: "İhtiyaçlarınızı kısaca anlatın, yakında size ulaşalım.",
            personType: "Şu sıfatla iletişime geçiyorum",
            individual: "Bireysel",
            company: "Şirket",
            companyName: "Şirket adı",
            companyWebsite: "Şirket web sitesi (opsiyonel)",
            companySize: "Şirket büyüklüğü",
            subject: "Konu",
            other: "Diğer",
            customSubject: "Özel konu",
            name: "Adınız",
            email: "E-posta",
            phone: "Telefon (opsiyonel)",
            message: "Mesajınız",
            submit: "Gönder",
            sending: "Gönderiliyor...",
            success: "Teşekkürler. Mesajınız gönderildi.",
            error: "Mesajınız gönderilemedi. Lütfen tekrar deneyin.",
            required: "Bu alan zorunludur.",
            invalidEmail: "Geçerli bir e-posta adresi girin.",
        },
    }[locale]

    const [asCompany, setAsCompany] = React.useState(false)
    const [subject, setSubject] = React.useState<string | undefined>("AI Consulting")
    const [customSubject, setCustomSubject] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
    const [errors, setErrors] = React.useState<Record<string, string>>({})

    function fieldClass(name: string) {
        return errors[name] ? "border-destructive focus-visible:ring-destructive/30" : ""
    }

    function FieldError({ name }: { name: string }) {
        if (!errors[name]) return null
        return <p className="mt-1.5 text-sm text-destructive">{errors[name]}</p>
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus("idle")

        const fd = new FormData(e.currentTarget)
        const form = e.currentTarget
        const name = fd.get("name")?.toString().trim() ?? ""
        const email = fd.get("email")?.toString().trim() ?? ""
        const message = fd.get("message")?.toString().trim() ?? ""
        const selectedSubject = subject === t.other ? customSubject.trim() : subject
        const nextErrors: Record<string, string> = {}

        if (!name) nextErrors.name = t.required
        if (!email) nextErrors.email = t.required
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t.invalidEmail
        if (subject === t.other && !customSubject.trim()) nextErrors.customSubject = t.required
        if (!message) nextErrors.message = t.required

        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setIsSubmitting(true)
        const payload = {
            contactType: asCompany ? "company" : "individual",
            name,
            email,
            phone: fd.get("phone")?.toString() ?? "",
            subject: selectedSubject,
            message,
        }

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                setStatus("error")
                return
            }

            form.reset()
            setCustomSubject("")
            setSubject("AI Consulting")
            setAsCompany(false)
            setErrors({})
            setStatus("success")
        } catch (error) {
            console.error("[CONTACT FORM] Failed to submit", error)
            setStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm"
            data-aos="fade-right"
        >
            <h2 className="text-2xl font-semibold mb-2">{t.sendMessage}</h2>
            <p className="text-muted-foreground mb-6">{t.desc}</p>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* بخش هویت */}
                <div data-aos="fade-up" data-aos-delay="50">
                    <Label className="mb-2 block">{t.personType}</Label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setAsCompany(false)}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition ${!asCompany ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"
                                }`}
                        >
                            {t.individual}
                        </button>
                        <button
                            type="button"
                            onClick={() => setAsCompany(true)}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition ${asCompany ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"
                                }`}
                        >
                            {t.company}
                        </button>
                    </div>
                </div>

                <div className="border-t border-border/50" />

                {/* اطلاعات پایه */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-delay="150">
                    <div>
                        <Label htmlFor="name" className="mb-1.5 block">{t.name}</Label>
                        <Input id="name" name="name" placeholder="John Doe" className={fieldClass("name")} aria-invalid={!!errors.name} />
                        <FieldError name="name" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-1.5 block">{t.email}</Label>
                        <Input id="email" name="email" type="email" placeholder="you@example.com" className={fieldClass("email")} aria-invalid={!!errors.email} />
                        <FieldError name="email" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="mb-1.5 block">{t.phone}</Label>
                        <Input id="phone" name="phone" placeholder="+1 555 123 4567" />
                    </div>
                </div>

                {/* سابجکت */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-delay="200">
                    <div className="md:col-span-2">
                        <Label className="mb-1.5 block">{t.subject}</Label>
                        <Select value={subject} onValueChange={setSubject}>
                            <SelectTrigger><SelectValue placeholder={t.subject} /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AI Consulting">AI Consulting</SelectItem>
                                <SelectItem value="Custom Software">Custom Software</SelectItem>
                                <SelectItem value="Infrastructure & DevOps">Infrastructure & DevOps</SelectItem>
                                <SelectItem value="Security & Compliance">Security & Compliance</SelectItem>
                                <SelectItem value={t.other}>{t.other}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {subject === t.other && (
                        <div>
                            <Label htmlFor="customSubject" className="mb-1.5 block">{t.customSubject}</Label>
                            <Input
                                id="customSubject"
                                value={customSubject}
                                onChange={(e) => setCustomSubject(e.target.value)}
                                className={fieldClass("customSubject")}
                                aria-invalid={!!errors.customSubject}
                            />
                            <FieldError name="customSubject" />
                        </div>
                    )}
                </div>

                <div className="border-t border-border/50" />

                {/* پیام */}
                <div data-aos="fade-up" data-aos-delay="250">
                    <Label htmlFor="message" className="mb-1.5 block">{t.message}</Label>
                    <Textarea id="message" name="message" className={`min-h-[160px] ${fieldClass("message")}`} aria-invalid={!!errors.message} />
                    <FieldError name="message" />
                </div>

                {status !== "idle" && (
                    <p className={status === "success" ? "text-sm text-green-600" : "text-sm text-destructive"}>
                        {status === "success" ? t.success : t.error}
                    </p>
                )}

                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting} data-aos="fade-up" data-aos-delay="300">
                    {isSubmitting ? t.sending : t.submit}
                </Button>
            </form>
        </div>
    )
}
