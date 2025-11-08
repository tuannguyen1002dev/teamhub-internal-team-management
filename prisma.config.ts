import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'


export default defineConfig({
    schema: './prisma/schema.prisma',
    datasource: {
        url: process.env.DATABASE_URL || dotenv.config().parsed?.DATABASE_URL || ''
    },
})