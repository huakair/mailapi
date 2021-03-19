# MailSender

基于 [NodeMailer](https://github.com/nodemailer/nodemailer/), 提供邮件发送服务．

## API

发送邮件：

```
POST /api/hello
```

数据格式 JSON，例如：

```
{
    "to": "someone@gmail.com",
    "subject": "中午好",
    "text": "问候！"
}
```

身份验证通过在 HTTP Header 添加特定字段：

```
x-auth-secret: yourSecret
```

来实现．

实例：

```
curl -X POST \
--header 'Content-Type: application/json' \
--header 'x-auth-secret: B22DC315E2Z72031' \
-d @mailData.json https://mailsender-five.vercel.app/api/hello
```

返回值类型 `application/json`，格式：

```
interface ISendReceipt {
    date: string | number;
    messageId: string | undefined;
    previewUrl: string | false;
    to: string;
    subject: string;
    digest: string;
};

{
    receipt: ISendReceipt,
    receipt2: ISendReceipt
}
```

## 部署方式

Clone 这个仓库，然后：

```
cd mailsender

echo -n "EMAIL_USERNAME=you@somedomain.com
NICKNAME=Bunny
EMAIL_PASSWORD=passwordOfYourEmailAccount
EMAIL_HOST=mail.somedomain.com
SECRET=secret
" > .env
```

然后：

```
npm i 
```

然后：

```
npx next build
npx next start
```

即可．

