import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    })
    return Response.json(post)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

/* เปลี่ยนเฉพาะ PUT */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // เพิ่ม category รับผ่าน body เข้ามาเพิ่ม
    const { title, content, categoryId } = await req.json()
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: { title, content, categoryId: Number(categoryId) },
    })
    return Response.json(post)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}