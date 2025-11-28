"use client"

import * as React from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQItem = { q: string; a: string }
type FAQCategory = { category: string; items: FAQItem[] }

export default function FAQAccordion({ categories }: { categories: FAQCategory[] }) {
  React.useEffect(() => {
    AOS.init({
      duration: 700,        // سرعت انیمیشن
      once: true,           // فقط بار اول
      offset: 40,           // فاصله تریگر
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow"
          data-aos="fade-up"
          data-aos-delay={i * 100}      // تاخیر تدریجی برای هر باکس
        >
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h3 className="text-xl font-semibold">{cat.category}</h3>
          </div>

          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {cat.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${i}-${idx}`}
                  className="border-b border-border/40"
                  data-aos="fade-up"
                  data-aos-delay={Math.min(400, i * 100 + idx * 60)} // انیمیشن ملایم سوال‌ها
                >
                  <AccordionTrigger className="text-left py-4 hover:no-underline">
                    <span className="font-medium">{item.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ))}
    </div>
  )
}
