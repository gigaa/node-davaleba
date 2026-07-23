"use client"
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUSchema } from '../validators/Sign-Up';
import { useRouter } from 'next/navigation';

import axios from "axios"
import Link from 'next/link';
export default function SignUp() {
   const {register,handleSubmit,formState: { errors }} = useForm({
        resolver:yupResolver(SignUSchema)
    })

    const [error,setError] = useState("")

    const router = useRouter()

    async function onSubmit(data){
        try {
            setError("")
            const res = await axios.post("http://localhost:4000/auth/sign-up",data)
            if(res.status === 200){
                router.push("/sign-in")
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">ანგარიშის შექმნა</h2>
          <p className="text-sm text-gray-500 mt-2">
            შეავსეთ ველები რეგისტრაციისთვის
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              სრული სახელი
            </label>
            <input
              type="text"
              required
              placeholder="გიორგი გიორგაძე"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              {...register("fullName")}
            />
          </div>

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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              პაროლი
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              {...register("password")}
            />
          </div>

   
          <button
            type="submit"
            // disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
          >
            რეგისტრაცია
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          უკვე გაქვთ ანგარიში?{' '}
          <Link href="/sign-in" className="text-blue-600 font-semibold hover:underline">
            შესვლა
          </Link>
        </p>
      </div>
    </div>
  );
}