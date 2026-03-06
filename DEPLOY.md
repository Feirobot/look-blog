# 🚀 容器部署指南

**域名**: `look.syncplay.cn`  
**项目**: 个人博客 (Astro + Nginx)

---

## 📋 前置要求

1. **服务器**: 任意 Linux 服务器（Ubuntu/Debian/CentOS/Alpine）
2. **Docker**: 已安装 Docker 和 Docker Compose
3. **域名**: `look.syncplay.cn` 已解析到服务器 IP
4. **端口**: 80 和 443 端口未被占用

---

## 🔧 部署步骤

### 步骤 1: 准备服务器

```bash
# SSH 登录服务器
ssh root@45.78.235.59  # 替换为你的服务器 IP

# 安装 Docker (如果未安装)
curl -fsSL https://get.docker.com | sh

# 安装 Docker Compose
docker compose version  # 验证安装
```

### 步骤 2: 上传项目

```bash
# 方法 1: Git 克隆
git clone <your-repo-url> /opt/blog
cd /opt/blog/blog

# 方法 2: SCP 上传
scp -r ./blog root@45.78.235.59:/opt/blog/
```

### 步骤 3: 配置域名

**DNS 设置**（在域名服务商处）:
```
类型：A
主机：look
值：45.78.235.59  # 你的服务器 IP
TTL: 600
```

### 步骤 4: 申请 SSL 证书

```bash
cd /opt/blog/blog

# 修改脚本中的邮箱
vi setup-ssl.sh  # 修改 EMAIL="your-email@example.com"

# 赋予执行权限
chmod +x setup-ssl.sh

# 运行脚本
./setup-ssl.sh
```

**注意**: 如果 80 端口被占用，先停止占用服务：
```bash
# 查看占用 80 端口的服务
netstat -tlnp | grep :80

# 停止服务或修改配置
```

### 步骤 5: 启动容器

```bash
# 构建并启动
docker compose up -d --build

# 查看日志
docker compose logs -f

# 检查状态
docker compose ps
```

### 步骤 6: 验证部署

```bash
# 本地测试
curl -I https://look.syncplay.cn

# 浏览器访问
https://look.syncplay.cn
```

---

## 🔐 SSL 证书管理

### 查看证书信息
```bash
openssl s_client -connect look.syncplay.cn:443 -servername look.syncplay.cn
```

### 手动续期
```bash
certbot renew --force-renewal
docker compose restart blog
```

### 自动续期（推荐）
```bash
# 编辑 crontab
crontab -e

# 添加任务（每月 1 号检查续期）
0 0 1 * * certbot renew --quiet && docker compose restart blog
```

---

## 🛠️ 常用命令

```bash
# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f blog

# 重启容器
docker compose restart blog

# 停止容器
docker compose down

# 重新构建
docker compose up -d --build

# 进入容器
docker compose exec blog sh

# 更新容器（使用 watchtower）
docker compose --profile auto-update up -d
```

---

## 📊 监控与维护

### 健康检查
```bash
# 检查容器健康状态
docker inspect --format='{{.State.Health.Status}}' look-syncplay-blog
```

### 日志轮转
Nginx 日志已配置在 `./logs/nginx/`，建议设置日志轮转：

```bash
# /etc/logrotate.d/nginx-blog
/opt/blog/blog/logs/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        docker compose exec blog nginx -s reload
    endscript
}
```

---

## 🔒 安全加固

### 1. 防火墙配置
```bash
# UFW (Ubuntu)
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Firewalld (CentOS)
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

### 2. 禁用 root SSH 登录
```bash
# /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
```

### 3. 定期更新
```bash
# 更新系统
apt-get update && apt-get upgrade -y

# 更新 Docker 镜像
docker compose pull
docker compose up -d
```

---

## ❓ 故障排查

### 容器无法启动
```bash
# 查看详细日志
docker compose logs blog

# 检查端口占用
netstat -tlnp | grep :80
netstat -tlnp | grep :443
```

### SSL 证书问题
```bash
# 检查证书文件
ls -la ./ssl/

# 验证证书
openssl x509 -in ./ssl/fullchain.pem -text -noout
```

### 域名解析问题
```bash
# 检查 DNS 解析
dig look.syncplay.cn
nslookup look.syncplay.cn

# 检查 hosts 文件
cat /etc/hosts
```

### 性能问题
```bash
# 查看资源使用
docker stats look-syncplay-blog

# 检查 Nginx 配置
docker compose exec blog nginx -t
```

---

## 📈 性能优化

### 1. 启用 HTTP/2
已在 `nginx.conf` 中配置：
```nginx
listen 443 ssl http2;
```

### 2. Gzip 压缩
已配置，压缩文本资源。

### 3. 浏览器缓存
静态资源缓存 1 年，HTML 不缓存。

### 4. CDN 加速（可选）
```bash
# Cloudflare / 阿里云 CDN
# CNAME: look.syncplay.cn → CDN 地址
```

---

## 🎯 部署检查清单

- [ ] DNS 解析生效 (`dig look.syncplay.cn`)
- [ ] SSL 证书申请成功
- [ ] 容器正常运行 (`docker compose ps`)
- [ ] HTTPS 访问正常
- [ ] HTTP 自动跳转 HTTPS
- [ ] 证书续期任务已配置
- [ ] 防火墙规则已配置
- [ ] 日志轮转已配置
- [ ] 监控告警已配置（可选）

---

## 📞 支持

遇到问题？

1. 查看日志：`docker compose logs -f`
2. 检查配置：`docker compose exec blog nginx -t`
3. 验证 SSL: `openssl s_client -connect look.syncplay.cn:443`

---

**部署愉快！** 🎉
