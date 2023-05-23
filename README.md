# MIMG

简体中文 | [English](https://github.com/jines-z/mimg/blob/master/README-en.md)

### 全局安装

```cmd
npm install -g mimg
```

### Key

项目内置了一个免费的 key，你可以免费使用并跳过这一步。

[申请一个 key](https://tinypng.com/developers)

```cmd
mimg set key
```

### 压缩文件夹内所有的图片

```cmd
mimg -a
```

### 压缩单张图片，也可以多张一起压缩

使用小写逗号“,”作为分隔符

```cmd
mimg -f a.png,b.png,c.png
```

### 图片转 base64

图片最大不能超过 1MB

```cmd
mimg -b a.png
```

### 备注

免费的 key 每个月可以压缩 500 张图片，转换 base64 没有数量限制。
