import hashlib
code='1105'
m=hashlib.md5()
b=code.encode(encoding='utf-8')
m.update(b)
str_md5=m.hexdigest()
print(str_md5)
