"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = "en" | "ar" | "tr"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* -----------------------------
   Translations (flat key map)
----------------------------- */
const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    products: "Products",
    career: "Career",
    aboutUs: "About Us",
    blog: "Blog",
    faq: "FAQ",
    solutions: "Solutions",
    contactUs: "Contact Us",
    getStarted: "Get Started",
    learnMore: "Learn More",
    heroTitle: "Transform Your Business with Innovation",
    heroSubtitle:
      "Empower your organization with cutting-edge solutions that drive growth and efficiency in the digital age.",
    productsHeroTitle: "Our Products & Solutions",
    productsHeroSubtitle: "Discover innovative tools designed to elevate your business performance.",
    careerHeroTitle: "Join Our Team",
    careerHeroSubtitle: "Build your career with a company that values innovation, creativity, and growth.",
    aboutHeroTitle: "About Our Company",
    aboutHeroSubtitle: "We are dedicated to delivering excellence through innovation and customer-focused solutions.",
    blogHeroTitle: "Insights & Updates",
    blogHeroSubtitle: "Stay informed with the latest trends, news, and expert perspectives from our team.",
    faqHeroTitle: "Frequently Asked Questions",
    faqHeroSubtitle: "Find answers to common questions about our products and services.",
    contactHeroTitle: "Get in Touch",
    contactHeroSubtitle: "We'd love to hear from you. Reach out to discuss how we can help your business.",
    quickLinks: "Quick Links",
    exploreMore: "Explore More",
    readyToStart: "Ready to Get Started?",
    readyToStartDesc: "Join thousands of businesses already transforming their operations with our solutions.",
    allProducts: "All Products",
    software: "Software",
    hardware: "Hardware",
    services: "Services",
    faqQuestion1: "What services do you offer?",
    faqAnswer1:
      "We offer a comprehensive range of services including software development, hardware solutions, consulting, and ongoing support to help your business thrive in the digital age.",
    faqQuestion2: "How can I get started?",
    faqAnswer2:
      "Getting started is easy! Simply contact us through our contact form or give us a call. Our team will schedule a consultation to understand your needs and propose the best solutions.",
    faqQuestion3: "What is your pricing model?",
    faqAnswer3:
      "Our pricing is flexible and tailored to your specific needs. We offer various packages and custom solutions to fit different budgets and requirements. Contact us for a detailed quote.",
    faqQuestion4: "Do you provide customer support?",
    faqAnswer4:
      "Yes! We provide 24/7 customer support to all our clients. Our dedicated support team is always ready to assist you with any questions or issues you may encounter.",
    faqQuestion5: "Can I customize the solutions?",
    faqAnswer5:
      "All our solutions are highly customizable to meet your unique business requirements. We work closely with you to ensure the final product aligns perfectly with your goals.",
    faqQuestion6: "What industries do you serve?",
    faqAnswer6:
      "We serve a wide range of industries including technology, healthcare, finance, retail, manufacturing, and more. Our solutions are adaptable to various business sectors.",
    sendMessage: "Send us a Message",
    sendMessageDesc: "Fill out the form below and we'll get back to you as soon as possible.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    contactInfo: "Contact Information",
    contactInfoDesc: "Get in touch with us through any of these channels.",
    email: "Email",
    phone: "Phone",
    address: "Address",
    followUs: "Follow Us",
    technology: "Technology",
    business: "Business",
    innovation: "Innovation",
    culture: "Culture",
    sustainability: "Sustainability",
    readMore: "Read More",
    blogPost1Title: "The Future of Digital Transformation",
    blogPost1Excerpt:
      "Explore how emerging technologies are reshaping the business landscape and what it means for your organization's future.",
    blogPost2Title: "Building Scalable Business Solutions",
    blogPost2Excerpt:
      "Learn the key principles and strategies for creating business solutions that grow with your company's needs.",
    blogPost3Title: "Innovation in the Modern Workplace",
    blogPost3Excerpt:
      "Discover how innovative approaches to work are driving productivity and employee satisfaction in today's business environment.",
    blogPost4Title: "Creating a Culture of Excellence",
    blogPost4Excerpt:
      "Understanding the importance of company culture and how it impacts overall business success and employee engagement.",
    blogPost5Title: "Emerging Technologies to Watch",
    blogPost5Excerpt:
      "Stay ahead of the curve with insights into the latest technological advancements that are transforming industries worldwide.",
    blogPost6Title: "Sustainable Business Practices",
    blogPost6Excerpt:
      "Learn how implementing sustainable practices can benefit both your business and the environment for long-term success.",
    featuresTitle: "What Sets Us Apart",
    featuresSubtitle: "Four pillars that power our AI-driven products and services.",
    feature1Title: "AI-First Architecture",
    feature1Desc: "Modular, model-agnostic pipelines designed for scale and rapid iteration.",
    feature2Title: "Security & Privacy",
    feature2Desc: "Data governance, encryption, and compliance baked into every layer.",
    feature3Title: "Delightful UX",
    feature3Desc: "Human-centered flows with robust streaming and personalization.",
    feature4Title: "High Performance",
    feature4Desc: "Low latency, smart caching, and cost-efficient infrastructure."
  },
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    career: "الوظائف",
    aboutUs: "من نحن",
    solutions: "الحلول",
    blog: "المدونة",
    faq: "الأسئلة الشائعة",
    contactUs: "اتصل بنا",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    heroTitle: "حوّل عملك بالابتكار",
    heroSubtitle: "قم بتمكين مؤسستك بحلول متطورة تدفع النمو والكفاءة في العصر الرقمي.",
    productsHeroTitle: "منتجاتنا وحلولنا",
    productsHeroSubtitle: "اكتشف الأدوات المبتكرة المصممة لرفع أداء عملك.",
    careerHeroTitle: "انضم إلى فريقنا",
    careerHeroSubtitle: "ابنِ مسيرتك المهنية مع شركة تقدر الابتكار والإبداع والنمو.",
    aboutHeroTitle: "عن شركتنا",
    aboutHeroSubtitle: "نحن ملتزمون بتقديم التميز من خلال الابتكار والحلول التي تركز على العملاء.",
    blogHeroTitle: "رؤى وتحديثات",
    blogHeroSubtitle: "ابق على اطلاع بأحدث الاتجاهات والأخبار ووجهات النظر من فريقنا.",
    faqHeroTitle: "الأسئلة الشائعة",
    faqHeroSubtitle: "ابحث عن إجابات للأسئلة الشائعة حول منتجاتنا وخدماتنا.",
    contactHeroTitle: "تواصل معنا",
    contactHeroSubtitle: "نود أن نسمع منك. تواصل معنا لمناقشة كيف يمكننا مساعدة عملك.",
    quickLinks: "روابط سريعة",
    exploreMore: "استكشف المزيد",
    readyToStart: "هل أنت مستعد للبدء؟",
    readyToStartDesc: "انضم إلى آلاف الشركات التي تحول عملياتها بالفعل باستخدام حلولنا.",
    allProducts: "جميع المنتجات",
    software: "البرمجيات",
    hardware: "الأجهزة",
    services: "الخدمات",
    faqQuestion1: "ما هي الخدمات التي تقدمونها؟",
    faqAnswer1:
      "نقدم مجموعة شاملة من الخدمات بما في ذلك تطوير البرمجيات وحلول الأجهزة والاستشارات والدعم المستمر لمساعدة عملك على الازدهار في العصر الرقمي.",
    faqQuestion2: "كيف يمكنني البدء؟",
    faqAnswer2:
      "البدء سهل! ما عليك سوى الاتصال بنا من خلال نموذج الاتصال أو الاتصال بنا. سيقوم فريقنا بجدولة استشارة لفهم احتياجاتك واقتراح أفضل الحلول.",
    faqQuestion3: "ما هو نموذج التسعير الخاص بكم؟",
    faqAnswer3:
      "أسعارنا مرنة ومصممة خصيصًا لتلبية احتياجاتك المحددة. نقدم حزمًا متنوعة وحلولًا مخصصة لتناسب الميزانيات والمتطلبات المختلفة. اتصل بنا للحصول على عرض أسعار مفصل.",
    faqQuestion4: "هل تقدمون دعم العملاء؟",
    faqAnswer4:
      "نعم! نقدم دعمًا للعملاء على مدار الساعة طوال أيام الأسبوع لجميع عملائنا. فريق الدعم المخصص لدينا جاهز دائمًا لمساعدتك في أي أسئلة أو مشكلات قد تواجهها.",
    faqQuestion5: "هل يمكنني تخصيص الحلول؟",
    faqAnswer5:
      "بالتأكيد! جميع حلولنا قابلة للتخصيص بدرجة كبيرة لتلبية متطلبات عملك الفريدة. نعمل معك عن كثب لضمان توافق المنتج النهائي تمامًا مع أهدافك.",
    faqQuestion6: "ما هي الصناعات التي تخدمونها؟",
    faqAnswer6:
      "نخدم مجموعة واسعة من الصناعات بما في ذلك التكنولوجيا والرعاية الصحية والمالية والتجزئة والتصنيع والمزيد. حلولنا قابلة للتكيف مع قطاعات الأعمال المختلفة.",
    sendMessage: "أرسل لنا رسالة",
    sendMessageDesc: "املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن.",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    subject: "الموضوع",
    yourMessage: "رسالتك",
    contactInfo: "معلومات الاتصال",
    contactInfoDesc: "تواصل معنا من خلال أي من هذه القنوات.",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    followUs: "تابعنا",
    technology: "التكنولوجيا",
    business: "الأعمال",
    innovation: "الابتكار",
    culture: "الثقافة",
    sustainability: "الاستدامة",
    readMore: "اقرأ المزيد",
    blogPost1Title: "مستقبل التحول الرقمي",
    blogPost1Excerpt: "استكشف كيف تعيد التقنيات الناشئة تشكيل مشهد الأعمال وما يعنيه ذلك لمستقبل مؤسستك.",
    blogPost2Title: "بناء حلول أعمال قابلة للتوسع",
    blogPost2Excerpt: "تعرف على المبادئ والاستراتيجيات الأساسية لإنشاء حلول أعمال تنمو مع احتياجات شركتك.",
    blogPost3Title: "الابتكار في مكان العمل الحديث",
    blogPost3Excerpt: "اكتشف كيف تدفع الأساليب المبتكرة للعمل الإنتاجية ورضا الموظفين في بيئة الأعمال اليوم.",
    blogPost4Title: "خلق ثقافة التميز",
    blogPost4Excerpt: "فهم أهمية ثقافة الشركة وكيف تؤثر على نجاح الأعمال الشامل ومشاركة الموظفين.",
    blogPost5Title: "التقنيات الناشئة التي يجب مراقبتها",
    blogPost5Excerpt: "ابق في الطليعة مع رؤى حول أحدث التطورات التكنولوجية التي تحول الصناعات في جميع أنحاء العالم.",
    blogPost6Title: "ممارسات الأعمال المستدامة",
    blogPost6Excerpt:
      "تعرف على كيف يمكن أن يفيد تنفيذ الممارسات المستدامة كلاً من عملك والبيئة لتحقيق النجاح على المدى الطويل.",
    featuresTitle: "ما يميزنا",
    featuresSubtitle: "أربعة أعمدة تدعم منتجاتنا وخدماتنا المدعومة بالذكاء الاصطناعي.",
    feature1Title: "معمارية أولاً-الذكاء الاصطناعي",
    feature1Desc: "مسارات معالجة معيارية وغير مرتبطة بنموذج، قابلة للتوسع وسريعة التكرار.",
    feature2Title: "الأمن والخصوصية",
    feature2Desc: "حوكمة البيانات والتشفير والامتثال مدمجة في كل طبقة.",
    feature3Title: "تجربة مستخدم ممتعة",
    feature3Desc: "تجارب متمحورة حول الإنسان مع بث ثابت وتخصيص ذكي.",
    feature4Title: "أداء عالٍ",
    feature4Desc: "كمون منخفض وتخزين مؤقت ذكي وبنية تحتية فعّالة التكلفة."
  },
  tr: {
    home: "Ana Sayfa",
    products: "Ürünler",
    career: "Kariyer",
    aboutUs: "Hakkımızda",
    solutions: "çözümler",
    blog: "Blog",
    faq: "SSS",
    contactUs: "İletişim",
    getStarted: "Başlayın",
    learnMore: "Daha Fazla",
    heroTitle: "İşinizi İnovasyonla Dönüştürün",
    heroSubtitle: "Dijital çağda büyüme ve verimliliği artıran son teknoloji çözümlerle organizasyonunuzu güçlendirin.",
    productsHeroTitle: "Ürünlerimiz ve Çözümlerimiz",
    productsHeroSubtitle: "İş performansınızı yükseltmek için tasarlanmış yenilikçi araçları keşfedin.",
    careerHeroTitle: "Ekibimize Katılın",
    careerHeroSubtitle: "İnovasyonu, yaratıcılığı ve büyümeyi değer veren bir şirkette kariyerinizi inşa edin.",
    aboutHeroTitle: "Şirketimiz Hakkında",
    aboutHeroSubtitle: "İnovasyon ve müşteri odaklı çözümler aracılığıyla mükemmellik sunmaya kendimizi adadık.",
    blogHeroTitle: "İçgörüler ve Güncellemeler",
    blogHeroSubtitle: "Ekibimizden en son trendler, haberler ve uzman görüşleriyle bilgilenin.",
    faqHeroTitle: "Sıkça Sorulan Sorular",
    faqHeroSubtitle: "Ürünlerimiz ve hizmetlerimiz hakkında sık sorulan soruların yanıtlarını bulun.",
    contactHeroTitle: "İletişime Geçin",
    contactHeroSubtitle:
      "Sizden haber almak isteriz. İşinize nasıl yardımcı olabileceğimizi görüşmek için bize ulaşın.",
    quickLinks: "Hızlı Bağlantılar",
    exploreMore: "Daha Fazla Keşfet",
    readyToStart: "Başlamaya Hazır mısınız?",
    readyToStartDesc: "Çözümlerimizle operasyonlarını dönüştüren binlerce işletmeye katılın.",
    allProducts: "Tüm Ürünler",
    software: "Yazılım",
    hardware: "Donanım",
    services: "Hizmetler",
    faqQuestion1: "Hangi hizmetleri sunuyorsunuz?",
    faqAnswer1:
      "Yazılım geliştirme, donanım çözümleri, danışmanlık ve işinizin dijital çağda gelişmesine yardımcı olmak için sürekli destek dahil olmak üzere kapsamlı bir hizmet yelpazesi sunuyoruz.",
    faqQuestion2: "Nasıl başlayabilirim?",
    faqAnswer2:
      "Başlamak kolay! İletişim formumuzu kullanarak bize ulaşın veya bizi arayın. Ekibimiz ihtiyaçlarınızı anlamak ve en iyi çözümleri önermek için bir danışma planlayacaktır.",
    faqQuestion3: "Fiyatlandırma modeliniz nedir?",
    faqAnswer3:
      "Fiyatlandırmamız esnektir ve özel ihtiyaçlarınıza göre uyarlanmıştır. Farklı bütçelere ve gereksinimlere uygun çeşitli paketler ve özel çözümler sunuyoruz. Detaylı bir teklif için bizimle iletişime geçin.",
    faqQuestion4: "Müşteri desteği sağlıyor musunuz?",
    faqAnswer4:
      "Evet! Tüm müşterilerimize 7/24 müşteri desteği sağlıyoruz. Özel destek ekibimiz, karşılaşabileceğiniz herhangi bir soru veya sorunla size yardımcı olmaya her zaman hazırdır.",
    faqQuestion5: "Çözümleri özelleştirebilir miyim?",
    faqAnswer5:
      "Kesinlikle! Tüm çözümlerimiz benzersiz iş gereksinimlerinizi karşılamak için son derece özelleştirilebilir. Nihai ürünün hedeflerinizle mükemmel şekilde uyumlu olmasını sağlamak için sizinle yakın çalışıyoruz.",
    faqQuestion6: "Hangi sektörlere hizmet veriyorsunuz?",
    faqAnswer6:
      "Teknoloji, sağlık, finans, perakende, üretim ve daha fazlası dahil olmak üzere geniş bir sektör yelpazesine hizmet veriyoruz. Çözümlerimiz çeşitli iş sektörlerine uyarlanabilir.",
    sendMessage: "Bize Mesaj Gönderin",
    sendMessageDesc: "Aşağıdaki formu doldurun, en kısa sürede size geri döneceğiz.",
    yourName: "Adınız",
    yourEmail: "E-postanız",
    subject: "Konu",
    yourMessage: "Mesajınız",
    contactInfo: "İletişim Bilgileri",
    contactInfoDesc: "Bu kanallardan herhangi biri aracılığıyla bizimle iletişime geçin.",
    email: "E-posta",
    phone: "Telefon",
    address: "Adres",
    followUs: "Bizi Takip Edin",
    technology: "Teknoloji",
    business: "İş",
    innovation: "İnovasyon",
    culture: "Kültür",
    sustainability: "Sürdürülebilirlik",
    readMore: "Devamını Oku",
    blogPost1Title: "Dijital Dönüşümün Geleceği",
    blogPost1Excerpt:
      "Gelişen teknolojilerin iş ortamını nasıl yeniden şekillendirdiğini ve bunun organizasyonunuzun geleceği için ne anlama geldiğini keşfedin.",
    blogPost2Title: "Ölçeklenebilir İş Çözümleri Oluşturma",
    blogPost2Excerpt:
      "Şirketinizin ihtiyaçlarıyla büyüyen iş çözümleri oluşturmak için temel ilkeleri ve stratejileri öğrenin.",
    blogPost3Title: "Modern İş Yerinde İnovasyon",
    blogPost3Excerpt:
      "Günümüz iş ortamında yenilikçi çalışma yaklaşımlarının üretkenliği ve çalışan memnuniyetini nasıl artırdığını keşfedin.",
    blogPost4Title: "Mükemmellik Kültürü Yaratmak",
    blogPost4Excerpt: "Şirket kültürünün önemini ve genel iş başarısı ve çalışan katılımı üzerindeki etkisini anlayın.",
    blogPost5Title: "İzlenmesi Gereken Gelişen Teknolojiler",
    blogPost5Excerpt:
      "Dünya çapında endüstrileri dönüştüren en son teknolojik gelişmelere ilişkin içgörülerle öncü olun.",
    blogPost6Title: "Sürdürülebilir İş Uygulamaları",
    blogPost6Excerpt:
      "Sürdürülebilir uygulamaların uygulanmasının hem işinize hem de çevreye uzun vadeli başarı için nasıl fayda sağlayabileceğini öğrenin.",
    featuresTitle: "Bizi Öne Çıkaranlar",
    featuresSubtitle: "Yapay zekâ destekli ürün ve hizmetlerimizi taşıyan dört temel sütun.",
    feature1Title: "AI-Öncelikli Mimari",
    feature1Desc: "Ölçek ve hızlı iterasyon için modüler, modelden bağımsız hatlar.",
    feature2Title: "Güvenlik ve Gizlilik",
    feature2Desc: "Her katmanda veri yönetişimi, şifreleme ve uyumluluk yerleşik.",
    feature3Title: "Keyifli Deneyim",
    feature3Desc: "Güçlü akış ve kişiselleştirme ile insan odaklı akışlar.",
    feature4Title: "Yüksek Performans",
    feature4Desc: "Düşük gecikme, akıllı önbellek ve maliyet-etkin altyapı."
  }
}

/* -----------------------------
         Helpers
----------------------------- */
function isLang(v: any): v is Language {
  return v === "en" || v === "ar" || v === "tr"
}

function replaceLocaleInPath(path: string, next: Language) {
  const [pathname, qs = ""] = path.split("?")
  const parts = pathname.split("/")
  const hasLocale = isLang(parts[1])
  if (hasLocale) parts[1] = next
  else parts.splice(1, 0, next)
  const newPath = parts.join("/") || `/${next}`
  return qs ? `${newPath}?${qs}` : newPath
}

/* -----------------------------
      Provider & hook
----------------------------- */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const [language, setLanguageState] = useState<Language>("en")

  // همگام‌سازی با URL (segment اول)
  useEffect(() => {
    const seg = pathname.split("/")[1]
    const urlLang = isLang(seg) ? (seg as Language) : null
    const saved = (typeof window !== "undefined" && localStorage.getItem("language")) as Language | null
    const lang: Language = urlLang ?? (isLang(saved) ? saved : "en")

    setLanguageState(lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }, [pathname])

  // تغییر زبان: URL + state + کوکی + localStorage
  const handleSetLanguage = (lang: Language) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; samesite=lax`
    const nextPath = replaceLocaleInPath(pathname, lang)
    router.push(nextPath)
    setLanguageState(lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
