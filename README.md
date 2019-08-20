# MIMG
简体中文 | [English](https://github.com/jines-z/mimg/blob/master/README-en.md)
### 全局安装
```
npm install -g mimg
```
### Key
_你可以使用免费的 key 并跳过这一步._

[申请一个 key](https://tinypng.com/developers)
```
mimg set key
```
### 压缩文件夹内所有的图片
```
mimg -a
```
### 压缩单张图片，也可以多张一起压缩
```
mimg -f a.png,b.png,c.png
```
### 图片转 base64
_最大不能超过 1MB_
```
mimg -b a.png
```
### 备注
免费的 key 每个月可以压缩 500 张图片，转换 base64 没有数量限制。
