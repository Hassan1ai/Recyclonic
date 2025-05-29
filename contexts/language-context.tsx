"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.marketplace": "Marketplace",
    "nav.sell": "Sell Your Device",
    "nav.track": "Track Order",
    "nav.about": "About Us",
    "nav.contact": "Contact Us",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.profile": "My Profile",
    "nav.orders": "My Orders",
    "nav.requests": "My Requests",
    "nav.settings": "Settings",

    // Home Page
    "home.hero.title": "Recycle Electronics, Save the Planet",
    "home.hero.description":
      "Recyclonic helps reduce electronic waste by collecting, refurbishing, and reselling electronic components. Join us in our mission for a sustainable future.",
    "home.hero.sell": "Sell Your Device",
    "home.hero.browse": "Browse Marketplace",
    "home.how.title": "How It Works",
    "home.how.description":
      "Our process is simple and efficient, designed to make recycling your electronic devices as easy as possible.",
    "home.how.step1.title": "1. Sell Your Device",
    "home.how.step1.description":
      "Upload photos and details of your device. We'll provide an estimated value and arrange a pickup.",
    "home.how.step2.title": "2. We Collect & Process",
    "home.how.step2.description":
      "Our team collects your device, evaluates it, and either refurbishes it or recycles it responsibly.",
    "home.how.step3.title": "3. Shop Refurbished",
    "home.how.step3.description":
      "Browse our marketplace for quality refurbished electronics at affordable prices with warranty.",
    "home.impact.title": "Our Environmental Impact",
    "home.impact.description":
      "Together with our community, we're making a significant difference in reducing e-waste and protecting our planet.",
    "home.impact.waste": "KG of E-Waste Collected",
    "home.impact.recycled": "KG of E-Waste Recycled",
    "home.impact.devices": "Devices Refurbished",
    "home.impact.co2": "CO₂ Emissions Reduced (kg)",
    "home.products.title": "Featured Products",
    "home.products.viewAll": "View All",
    "home.testimonials.title": "What Our Customers Say",
    "home.testimonials.description":
      "Don't just take our word for it. Here's what people who have used our platform have to say.",
    "home.cta.title": "Ready to Make a Difference?",
    "home.cta.description":
      "Join thousands of environmentally conscious individuals and businesses in our mission to reduce e-waste.",
    "home.cta.sell": "Sell Your Device",
    "home.cta.shop": "Shop Refurbished",

    // Marketplace
    "marketplace.title": "Marketplace",
    "marketplace.description": "Browse our selection of quality refurbished electronics and parts",
    "marketplace.search": "Search products...",
    "marketplace.filter": "Filters",
    "marketplace.sort": "Sort by",
    "marketplace.price": "Price Range",
    "marketplace.category": "Categories",
    "marketplace.condition": "Condition",
    "marketplace.apply": "Apply Filters",
    "marketplace.addProduct": "Add Product",

    // Product
    "product.description": "Description",
    "product.specifications": "Specifications",
    "product.condition": "Condition",
    "product.warranty": "Warranty",
    "product.addToCart": "Add to Cart",
    "product.buyNow": "Buy Now",
    "product.relatedProducts": "Related Products",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.continue": "Continue Shopping",
    "cart.product": "Product",
    "cart.price": "Price",
    "cart.quantity": "Quantity",
    "cart.total": "Total",
    "cart.remove": "Remove",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.tax": "Tax",
    "cart.orderTotal": "Order Total",
    "cart.checkout": "Checkout",
    "cart.promo": "Promo Code",
    "cart.apply": "Apply",

    // Settings
    "settings.title": "Settings",
    "settings.account": "Account",
    "settings.notifications": "Notifications",
    "settings.privacy": "Privacy",
    "settings.language": "Language",
    "settings.account.title": "Account Settings",
    "settings.account.description": "Manage your account information and password",
    "settings.email": "Email Address",
    "settings.changePassword": "Change Password",
    "settings.currentPassword": "Current Password",
    "settings.newPassword": "New Password",
    "settings.confirmPassword": "Confirm New Password",
    "settings.saveChanges": "Save Changes",
    "settings.saving": "Saving...",
    "settings.language.title": "Language Settings",
    "settings.language.description": "Choose your preferred language",
    "settings.language.english": "English",
    "settings.language.arabic": "Arabic",

    // Notifications
    "notifications.title": "Notification Settings",
    "notifications.description": "Manage how you receive notifications",
    "notifications.email": "Email Notifications",
    "notifications.email.description": "Receive notifications via email",
    "notifications.marketplace": "Marketplace Updates",
    "notifications.marketplace.description": "Get notified about new products in the marketplace",
    "notifications.orders": "Order Updates",
    "notifications.orders.description": "Get notified about your order status changes",
    "notifications.promotional": "Promotional Emails",
    "notifications.promotional.description": "Receive promotional offers and discounts",

    // Privacy
    "privacy.title": "Privacy Settings",
    "privacy.description": "Manage your privacy preferences",
    "privacy.profile": "Profile Visibility",
    "privacy.profile.description": "Make your profile visible to other users",
    "privacy.data": "Data Sharing",
    "privacy.data.description": "Allow us to share your data with trusted partners",
    "privacy.activity": "Activity Tracking",
    "privacy.activity.description": "Allow us to track your activity to improve your experience",

    // Track
    "track.title": "Track Your Order",
    "track.description": "Enter your order ID or pickup request ID to check its status",
    "track.orderId": "Order ID or Request ID",
    "track.placeholder": "e.g., ORD-123456 or REQ-123456",
    "track.button": "Track",
    "track.searching": "Searching...",
    "track.status": "Status",
    "track.details": "Details",
    "track.processing": "Processing",
    "track.shipped": "Shipped",
    "track.delivered": "Delivered",
    "track.pending": "Pending",
    "track.approved": "Approved",
    "track.collected": "Collected",
    "track.items": "Items",
    "track.device": "Device Information",
    "track.address": "Address",
    "track.tracking": "Tracking Information",
    "track.help": "Need Help?",
    "track.contact": "Contact Support",

    // Contact
    "contact.title": "Contact Us",
    "contact.description":
      "Have questions or feedback? We'd love to hear from you. Reach out to our team using any of the methods below.",
    "contact.phone": "Phone",
    "contact.phone.description": "Call us directly for immediate assistance",
    "contact.email": "Email",
    "contact.email.description": "Send us an email for general inquiries",
    "contact.visit": "Visit Us",
    "contact.visit.description": "Come to our office or recycling center",
    "contact.message": "Send Us a Message",
    "contact.name": "Your Name",
    "contact.email.address": "Email Address",
    "contact.subject": "Subject",
    "contact.message.text": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.faq": "Frequently Asked Questions",

    // Profile
    "profile.title": "My Profile",
    "profile.information": "Profile Information",
    "profile.orders": "My Orders",
    "profile.devices": "My Devices",
    "profile.member": "Member since",
    "profile.firstName": "First Name",
    "profile.lastName": "Last Name",
    "profile.email": "Email",
    "profile.phone": "Phone Number",
    "profile.address": "Address",
    "profile.bio": "Bio",
    "profile.edit": "Edit Profile",
    "profile.cancel": "Cancel",
    "profile.save": "Save Changes",
    "profile.saving": "Saving...",
    "profile.noOrders": "No orders yet",
    "profile.noOrders.description": "When you make a purchase, your orders will appear here.",
    "profile.browse": "Browse Marketplace",
    "profile.noDevices": "No devices yet",
    "profile.noDevices.description": "When you sell or recycle a device, it will appear here.",
    "profile.sell": "Sell a Device",

    // Footer
    "footer.about": "About Recyclonic",
    "footer.about.description":
      "An innovative e-waste recycling platform designed to collect, classify, refurbish, and resell electronic components.",
    "footer.links": "Quick Links",
    "footer.support": "Contact Us",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.address": "Address",
    "footer.newsletter": "Newsletter",
    "footer.newsletter.description":
      "Subscribe to our newsletter for updates on our latest products and environmental initiatives.",
    "footer.subscribe": "Subscribe",
    "footer.copyright": "© 2023 Recyclonic. All rights reserved.",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.marketplace": "السوق",
    "nav.sell": "بيع جهازك",
    "nav.track": "تتبع الطلب",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.login": "تسجيل الدخول",
    "nav.logout": "تسجيل الخروج",
    "nav.profile": "الملف الشخصي",
    "nav.orders": "طلباتي",
    "nav.requests": "طلبات الاستلام",
    "nav.settings": "الإعدادات",

    // Home Page
    "home.hero.title": "إعادة تدوير الإلكترونيات، حماية الكوكب",
    "home.hero.description":
      "ريسايكلونيك تساعد في تقليل النفايات الإلكترونية من خلال جمع وإعادة تأهيل وبيع المكونات الإلكترونية. انضم إلينا في مهمتنا من أجل مستقبل مستدام.",
    "home.hero.sell": "بيع جهازك",
    "home.hero.browse": "تصفح السوق",
    "home.how.title": "كيف يعمل",
    "home.how.description": "عمليتنا بسيطة وفعالة، مصممة لجعل إعادة تدوير أجهزتك الإلكترونية سهلة قدر الإمكان.",
    "home.how.step1.title": "١. بيع جهازك",
    "home.how.step1.description": "قم بتحميل صور وتفاصيل جهازك. سنقدم لك قيمة تقديرية ونرتب عملية الاستلام.",
    "home.how.step2.title": "٢. نقوم بالجمع والمعالجة",
    "home.how.step2.description": "يقوم فريقنا بجمع جهازك وتقييمه، ثم إما إعادة تأهيله أو إعادة تدويره بشكل مسؤول.",
    "home.how.step3.title": "٣. تسوق المنتجات المجددة",
    "home.how.step3.description": "تصفح سوقنا للحصول على إلكترونيات مجددة عالية الجودة بأسعار معقولة مع ضمان.",
    "home.impact.title": "تأثيرنا البيئي",
    "home.impact.description": "مع مجتمعنا، نحن نحدث فرقًا كبيرًا في تقليل النفايات الإلكترونية وحماية كوكبنا.",
    "home.impact.waste": "كجم من النفايات الإلكترونية تم جمعها",
    "home.impact.recycled": "كجم من النفايات الإلكترونية تم إعادة تدويرها",
    "home.impact.devices": "الأجهزة التي تم تجديدها",
    "home.impact.co2": "انبعاثات ثاني أكسيد الكربون التي تم تقليلها (كجم)",
    "home.products.title": "المنتجات المميزة",
    "home.products.viewAll": "عرض الكل",
    "home.testimonials.title": "ماذا يقول عملاؤنا",
    "home.testimonials.description": "لا تأخذ كلمتنا فقط. إليك ما يقوله الأشخاص الذين استخدموا منصتنا.",
    "home.cta.title": "هل أنت مستعد لإحداث فرق؟",
    "home.cta.description": "انضم إلى آلاف الأفراد والشركات الواعية بيئيًا في مهمتنا لتقليل النفايات الإلكترونية.",
    "home.cta.sell": "بيع جهازك",
    "home.cta.shop": "تسوق المنتجات المجددة",

    // Marketplace
    "marketplace.title": "السوق",
    "marketplace.description": "تصفح مجموعتنا من الإلكترونيات والقطع المجددة عالية الجودة",
    "marketplace.search": "البحث عن المنتجات...",
    "marketplace.filter": "التصفية",
    "marketplace.sort": "ترتيب حسب",
    "marketplace.price": "نطاق السعر",
    "marketplace.category": "الفئات",
    "marketplace.condition": "الحالة",
    "marketplace.apply": "تطبيق التصفية",
    "marketplace.addProduct": "إضافة منتج",

    // Product
    "product.description": "الوصف",
    "product.specifications": "المواصفات",
    "product.condition": "الحالة",
    "product.warranty": "الضمان",
    "product.addToCart": "أضف إلى السلة",
    "product.buyNow": "اشتر الآن",
    "product.relatedProducts": "منتجات ذات صلة",

    // Cart
    "cart.title": "سلة التسوق الخاصة بك",
    "cart.empty": "سلة التسوق فارغة",
    "cart.continue": "متابعة التسوق",
    "cart.product": "المنتج",
    "cart.price": "السعر",
    "cart.quantity": "الكمية",
    "cart.total": "المجموع",
    "cart.remove": "إزالة",
    "cart.subtotal": "المجموع الفرعي",
    "cart.shipping": "الشحن",
    "cart.tax": "الضريبة",
    "cart.orderTotal": "إجمالي الطلب",
    "cart.checkout": "إتمام الشراء",
    "cart.promo": "رمز الخصم",
    "cart.apply": "تطبيق",

    // Settings
    "settings.title": "الإعدادات",
    "settings.account": "الحساب",
    "settings.notifications": "الإشعارات",
    "settings.privacy": "الخصوصية",
    "settings.language": "اللغة",
    "settings.account.title": "إعدادات الحساب",
    "settings.account.description": "إدارة معلومات حسابك وكلمة المرور",
    "settings.email": "البريد الإلكتروني",
    "settings.changePassword": "تغيير كلمة المرور",
    "settings.currentPassword": "كلمة المرور الحالية",
    "settings.newPassword": "كلمة المرور الجديدة",
    "settings.confirmPassword": "تأكيد كلمة المرور الجديدة",
    "settings.saveChanges": "حفظ التغييرات",
    "settings.saving": "جاري الحفظ...",
    "settings.language.title": "إعدادات اللغة",
    "settings.language.description": "اختر لغتك المفضلة",
    "settings.language.english": "الإنجليزية",
    "settings.language.arabic": "العربية",

    // Notifications
    "notifications.title": "إعدادات الإشعارات",
    "notifications.description": "إدارة كيفية تلقي الإشعارات",
    "notifications.email": "إشعارات البريد الإلكتروني",
    "notifications.email.description": "تلقي الإشعارات عبر البريد الإلكتروني",
    "notifications.marketplace": "تحديثات السوق",
    "notifications.marketplace.description": "الحصول على إشعارات حول المنتجات الجديدة في السوق",
    "notifications.orders": "تحديثات الطلبات",
    "notifications.orders.description": "الحصول على إشعارات حول تغييرات حالة طلبك",
    "notifications.promotional": "رسائل البريد الإلكتروني الترويجية",
    "notifications.promotional.description": "تلقي العروض والخصومات الترويجية",

    // Privacy
    "privacy.title": "إعدادات الخصوصية",
    "privacy.description": "إدارة تفضيلات الخصوصية الخاصة بك",
    "privacy.profile": "رؤية الملف الشخصي",
    "privacy.profile.description": "جعل ملفك الشخصي مرئيًا للمستخدمين الآخرين",
    "privacy.data": "مشاركة البيانات",
    "privacy.data.description": "السماح لنا بمشاركة بياناتك مع شركاء موثوقين",
    "privacy.activity": "تتبع النشاط",
    "privacy.activity.description": "السماح لنا بتتبع نشاطك لتحسين تجربتك",

    // Track
    "track.title": "تتبع طلبك",
    "track.description": "أدخل رقم الطلب أو رقم طلب الاستلام للتحقق من حالته",
    "track.orderId": "رقم الطلب أو رقم الطلب",
    "track.placeholder": "مثال: ORD-123456 أو REQ-123456",
    "track.button": "تتبع",
    "track.searching": "جاري البحث...",
    "track.status": "الحالة",
    "track.details": "التفاصيل",
    "track.processing": "قيد المعالجة",
    "track.shipped": "تم الشحن",
    "track.delivered": "تم التوصيل",
    "track.pending": "قيد الانتظار",
    "track.approved": "تمت الموافقة",
    "track.collected": "تم الاستلام",
    "track.items": "العناصر",
    "track.device": "معلومات الجهاز",
    "track.address": "العنوان",
    "track.tracking": "معلومات التتبع",
    "track.help": "هل تحتاج إلى مساعدة؟",
    "track.contact": "اتصل بالدعم",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.description": "هل لديك أسئلة أو ملاحظات؟ نحن نحب أن نسمع منك. تواصل مع فريقنا باستخدام أي من الطرق أدناه.",
    "contact.phone": "الهاتف",
    "contact.phone.description": "اتصل بنا مباشرة للمساعدة الفورية",
    "contact.email": "البريد الإلكتروني",
    "contact.email.description": "أرسل لنا بريدًا إلكترونيًا للاستفسارات العامة",
    "contact.visit": "زورنا",
    "contact.visit.description": "تعال إلى مكتبنا أو مركز إعادة التدوير",
    "contact.message": "أرسل لنا رسالة",
    "contact.name": "اسمك",
    "contact.email.address": "عنوان البريد الإلكتروني",
    "contact.subject": "الموضوع",
    "contact.message.text": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جاري الإرسال...",
    "contact.faq": "الأسئلة الشائعة",

    // Profile
    "profile.title": "ملفي الشخصي",
    "profile.information": "معلومات الملف الشخصي",
    "profile.orders": "طلباتي",
    "profile.devices": "أجهزتي",
    "profile.member": "عضو منذ",
    "profile.firstName": "الاسم الأول",
    "profile.lastName": "اسم العائلة",
    "profile.email": "البريد الإلكتروني",
    "profile.phone": "رقم الهاتف",
    "profile.address": "العنوان",
    "profile.bio": "نبذة",
    "profile.edit": "تعديل الملف الشخصي",
    "profile.cancel": "إلغاء",
    "profile.save": "حفظ التغييرات",
    "profile.saving": "جاري الحفظ...",
    "profile.noOrders": "لا توجد طلبات بعد",
    "profile.noOrders.description": "عندما تقوم بعملية شراء، ستظهر طلباتك هنا.",
    "profile.browse": "تصفح السوق",
    "profile.noDevices": "لا توجد أجهزة بعد",
    "profile.noDevices.description": "عندما تبيع أو تعيد تدوير جهاز، سيظهر هنا.",
    "profile.sell": "بيع جهاز",

    // Footer
    "footer.about": "عن ريسايكلونيك",
    "footer.about.description":
      "منصة مبتكرة لإعادة تدوير النفايات الإلكترونية مصممة لجمع وتصنيف وتجديد وإعادة بيع المكونات الإلكترونية.",
    "footer.links": "روابط سريعة",
    "footer.support": "اتصل بنا",
    "footer.phone": "الهاتف",
    "footer.email": "البريد الإلكتروني",
    "footer.address": "العنوان",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.newsletter.description":
      "اشترك في نشرتنا الإخبارية للحصول على تحديثات حول أحدث منتجاتنا ومبادراتنا البيئية.",
    "footer.subscribe": "اشترك",
    "footer.copyright": "© 2023 ريسايكلونيك. جميع الحقوق محفوظة.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const dir = language === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    // Load language preference from localStorage on client side
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage)
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLanguage
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
