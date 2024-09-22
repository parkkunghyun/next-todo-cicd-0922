import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const todos = await prisma.todo.findMany()
        return new Response(JSON.stringify(todos), {status : 200})
    } catch (error) {
        return new Response("Failed to fetch todos", {status: 500})
    }
}

export async function POST(request) {
    try {
        const { text } = await request.json()
        const newTodo = await prisma.todo.create({
            data : { text },
        })
        return new Response(JSON.stringify(newTodo), {status: 201})
    } catch (error) {
        return new Response("Failed to create todo", {status : 500})
    }
}

export async function PUT(request) {
    try {
        const { id, text, completed } = await request.json()
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data : {text, completed},
        })
        return new Response(JSON.stringify(updatedTodo), {status: 200})
    } catch (error) {
        return new Response("Failed to update todo", {status : 500})
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json()
        await prisma.todo.delete({where : {id}})
        return new Response(null, {status: 204})
    } catch (error) {
        return new Response("Failed to delete todo", {status : 500})
    }
}