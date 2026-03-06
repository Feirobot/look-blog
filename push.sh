#!/bin/bash
# GitHub 推送脚本

echo "================================"
echo "  GitHub 推送助手"
echo "================================"
echo ""

# 方法 1: 使用 Personal Access Token
echo "请选择推送方式："
echo ""
echo "1️⃣  Personal Access Token (推荐)"
echo "2️⃣  SSH (已配置密钥)"
echo ""
read -p "选择 (1/2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "请访问：https://github.com/settings/tokens"
    echo "创建 token，勾选 'repo' 权限"
    echo ""
    read -p "输入 Token: " -s token
    echo ""
    
    # 推送
    cd /home/node/.openclaw/workspace/blog
    git push https://Feirobot:$token@github.com/Feirobot/look-blog.git main
    
elif [ "$choice" = "2" ]; then
    echo ""
    echo "使用 SSH 推送..."
    cd /home/node/.openclaw/workspace/blog
    git push -u origin main
fi

echo ""
echo "完成！"
