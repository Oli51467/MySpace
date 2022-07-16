##### myspace 简易版空间

部署：

1. 在vue控制台将项目打包 生成dist文件夹

2. 将dist文件夹压缩：

   ```
   tar -zcvf dist.tar.gz dist/
   ```

3. 将dist.tar.gz上传到服务器的项目文件夹下

4. 确保服务器安装docker和nginx

5. 在同一文件夹下创建Dockerfile

   ```
   sudo touch Dockerfile
   ```

6. 编辑Dockerfile

   ```
   sudo vim Dockerfile
   ```

   ```
   FROM nginx:stable-alpine
   COPY dist/ /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx","-g","daemon off;"]
   
   ```

7. 制作镜像

   ```
   sudo docker build -t myspace:1.0 .
   ```

   其中myspace为自定义镜像名，1.0为版本号，. 表示在当前路径下构建镜像

8. 创建并运行容器

   ```
   sudo docker run -p 9090:80 -d --name myspace myspace:1.0
   ```

   其中9090为服务器开放的任意空闲端口，也是访问网站的端口

   --name 为容器名 任取

   myspace:1.0为所用镜像名

9. 访问101.42.155.54:9090

