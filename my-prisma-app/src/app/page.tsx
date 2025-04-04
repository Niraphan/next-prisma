"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const List = () => {
  const [posts, setPosts] = useState([])
  const [searchByTitle, setSearchByTitle] = useState("")
  const [searchByCategory, setSearchByCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [sort, setSort] = useState("")

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])


  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      setPosts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deletePost = async (id: Number) => {
    try {
      await axios.delete(`/api/posts/${id}`)
      fetchPosts()
    } catch (error) {
      console.error("Failed to delete the post", error)
    }
  }

  const filter = async () => {
    try {
      const query = new URLSearchParams({
        category: searchByCategory,
        search: searchByTitle,
        sort,
      }).toString()
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts?${query}`
      )
      setPosts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 ">Blog Posts</h1>
      <div className="flex gap-[20px]">
        <input
          type="text"
          value={searchByTitle}
          onChange={(e) => setSearchByTitle(e.target.value)}
          placeholder="Search by title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <select
          value={searchByCategory}
          onChange={(e) => setSearchByCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a sort</option>
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>

        <button
          onClick={filter}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Filter
        </button>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div>{post.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {post.category?.name || "No Category"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/create"
      >
        Create a New Post
      </Link>
    </div>
  )
}

export default List
