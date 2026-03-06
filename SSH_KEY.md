# 🔑 SSH 公钥 - GitHub 认证

## 请复制以下公钥到 GitHub

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDen4HA4t7KNYvW/PxqGLYkYOgGdmGk7fSBCSg4xtYsv fei@syncplay.cn
```

---

## 📋 添加步骤

1. 访问：https://github.com/settings/keys
2. 点击 **"New SSH key"**
3. Title: `look-blog-server`
4. Key type: **Authentication Key**
5. 粘贴上面的公钥
6. 点击 **"Add SSH key"**

---

## ✅ 添加完成后执行

```bash
cd /home/node/.openclaw/workspace/blog
git push -u origin main
```

---

## 🔍 验证连接

```bash
ssh -T git@github.com
```

成功会显示：
```
Hi Feirobot! You've successfully authenticated, but GitHub does not provide shell access.
```
