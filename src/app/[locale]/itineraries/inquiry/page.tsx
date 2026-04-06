"use client"
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function RootPage() {
  const { i18n } = useTranslation()

  redirect(`/${i18n.language}/itineraries`)
}