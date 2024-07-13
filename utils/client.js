import { createClient } from '@supabase/supabase-js'

// Supabase credentials
const runtimeConfig = useRuntimeConfig()

const supabaseUrl = runtimeConfig.public.supabaseUrl
const supabaseKey = runtimeConfig.public.supabaseKey

const supabase = createClient(supabaseUrl, supabaseKey)

export default defineNuxtPlugin((nuxtApp) => {  {
    nuxtApp.provide('supabase', supabase)
} })