'use client'

import {supabase} from '@/utils/supabase'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Plus_Jakarta_Sans} from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
})

export const Footer = () => {
	return (
		<>
			<footer className="flex justify-center p-5 pb-2 text-white tracking-wider text-sm">
				<address>&copy; EUREKA</address>
			</footer>
		</>
	)
}
