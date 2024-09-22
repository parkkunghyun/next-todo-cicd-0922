# 1. Base image
FROM node:18 AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy application code
COPY . .

# prisma를 사용할 . 수있게 generate해주기
RUN npx prisma generate

# 6.정적파일과 최적화된 프로덕션 빌드가 생성됨
RUN npm run build

# 7. Production image
FROM node:18 AS production

# 8. production용 /app디렉토리를 만든다
WORKDIR /app

# 9. builder단계에서 생성된 빌드 결과물을 현재 작업 디렉토리로 복사함 -> 최종 이미지에는 빌드된 어플리케이션만 포함되게
COPY --from=builder /app/ .

# 10. 프로덕션에서만 필요한 애들만 설치함
RUN npm install --production

# 11. Expose the port
EXPOSE 3000

# 12. Start the application
CMD ["npm", "start"]
