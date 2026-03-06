#!/bin/bash
set -e

# SSL 证书申请脚本 - 使用 Let's Encrypt
# 域名
DOMAIN="look.syncplay.cn"
EMAIL="your-email@example.com"  # 请修改为你的邮箱

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}  SSL 证书申请脚本${NC}"
echo -e "${GREEN}  域名：${DOMAIN}${NC}"
echo -e "${GREEN}================================${NC}"

# 检查 certbot 是否安装
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}certbot 未安装，正在安装...${NC}"
    
    # 根据系统安装
    if [ -f /etc/debian_version ]; then
        apt-get update && apt-get install -y certbot
    elif [ -f /etc/redhat-release ]; then
        yum install -y certbot
    elif [ -f /etc/alpine-release ]; then
        apk add --no-cache certbot
    else
        echo -e "${RED}未知系统，请手动安装 certbot${NC}"
        exit 1
    fi
fi

# 创建 SSL 目录
SSL_DIR="./ssl"
mkdir -p "$SSL_DIR"

echo -e "${YELLOW}开始申请 SSL 证书...${NC}"

# 使用 standalone 模式申请证书（需要 80 端口空闲）
# 如果 80 端口被占用，使用 webroot 模式

# 方法 1: Standalone 模式（推荐，需要停止 Nginx）
echo -e "${YELLOW}方法 1: Standalone 模式（需要 80 端口空闲）${NC}"
echo "如果 80 端口被占用，请先停止容器：docker compose down"
read -p "是否继续？(y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    certbot certonly --standalone \
        -d "$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos \
        --non-interactive \
        --keep-until-expiring
    
    # 复制证书到项目目录
    echo -e "${YELLOW}复制证书到项目目录...${NC}"
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem "$SSL_DIR/"
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem "$SSL_DIR/"
    cp /etc/letsencrypt/live/$DOMAIN/chain.pem "$SSL_DIR/"
    
    echo -e "${GREEN}✓ 证书申请成功！${NC}"
    echo -e "${YELLOW}证书位置:${NC}"
    echo "  - $SSL_DIR/fullchain.pem"
    echo "  - $SSL_DIR/privkey.pem"
    echo ""
    echo -e "${YELLOW}现在可以启动容器:${NC}"
    echo "  docker compose up -d"
fi

# 方法 2: DNS 验证（如果 standalone 失败）
echo ""
echo -e "${YELLOW}方法 2: DNS 验证（如果 standalone 失败）${NC}"
echo "需要配置 DNS TXT 记录，适用于无法开放 80 端口的情况"
echo "参考：https://certbot.eff.org/instructions"

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}  证书续期${NC}"
echo -e "${GREEN}================================${NC}"
echo "Let's Encrypt 证书有效期 90 天，建议设置自动续期"
echo ""
echo "添加 crontab 任务:"
echo "0 0 1 * * certbot renew --quiet && docker compose restart blog"
echo ""
