'use client';

import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import axios from "axios"
import Link from 'next/link';
import { SignInSchema } from '../validators/Sign-In';
import {setCookie} from "cookies-next"

export default function SignIn() {
   const {register,handleSubmit,formState: { errors }} = useForm({
        resolver:yupResolver(SignInSchema)
    })

    const [error,setError] = useState("")

    const router = useRouter()
    async function onSubmit(data){
        try {
            setError("")
            const res = await axios.post("http://localhost:4000/auth/sign-in",data)
            
            if(res.status === 200){
                setCookie("accessToken",res.data.data,{maxAge:60*60})
                router.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">ავტორიზაცია</h2>
          <p className="text-sm text-gray-500 mt-2">
            შეიყვანეთ მონაცემები სისტემაში შესასვლელად
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ელ. ფოსტა
            </label>
            <input
                type="email"
                required
                placeholder="example@domain.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                {...register("email")} 
            />
            <p className='text-gray-900'>{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              პაროლი
            </label>
            <div className="relative">
                <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        {...register("password")}
                />
                <p className='text-gray-900'>{errors.password?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            შესვლა
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          არ გაქვთ ანგარიში?{' '}
          <Link href="/sign-up" className="text-blue-600 font-semibold hover:underline">
            რეგისტრაცია
          </Link>
        </p>
      </div>
    </div>
  );
}