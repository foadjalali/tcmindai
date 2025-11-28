"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NavLinkItem = { type: "link"; href: string; label: string }
type NavDropdownItem = { type: "dropdown"; label: string; items: { href: string; label: string }[] }
type NavItem = NavLinkItem | NavDropdownItem

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const href = `/${language}`

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // دسته‌های محصولات
  const productCategories = [
    { href: "/products", label: t("allProducts") },
    { href: "/products/software", label: t("software") },
    { href: "/products/hardware", label: t("hardware") },
    { href: "/products/services", label: t("services") },
  ]

  const navItems: NavItem[] = [
    { type: "link", href: "/", label: t("home") },
    { type: "dropdown", label: t("products"), items: productCategories },
    { type: "link", href: "/solutions", label: t("solutions") },
    { type: "link", href: "/blog", label: t("blog") },
    { type: "link", href: "/about", label: t("aboutUs") },
    { type: "link", href: "/career", label: t("career") },
    { type: "link", href: "/faq", label: t("faq") },
    { type: "link", href: "/contact", label: t("contactUs") },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${language}`} className="flex items-center">
            <img
              src="/tcmindai.png"
              alt="InovativAI — Intelligent Solutions"
              className="h-10 md:h-12 w-auto"
              style={{ height: '2rem' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) =>
              item.type === "link" ? (
                <Link
                  key={`${item.href}-${idx}`}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <DropdownMenu key={`dropdown-${idx}`}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.items.map((cat) => (
                      <DropdownMenuItem key={cat.href} asChild>
                        <Link href={cat.href} className="cursor-pointer">
                          {cat.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English {language === "en" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  العربية {language === "ar" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("tr")}>
                  Türkçe {language === "tr" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-top border-border bg-background/95 backdrop-blur-lg">
            {navItems.map((item, idx) =>
              item.type === "link" ? (
                <Link
                  key={`${item.href}-${idx}`}
                  href={item.href}
                  className="block py-3 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <div key={`dropdown-${idx}`} className="py-3">
                  <div className="text-sm font-medium text-foreground/80 mb-2">{item.label}</div>
                  {item.items.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block py-2 ps-4 text-sm text-foreground/60 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
