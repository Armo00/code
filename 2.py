def correctTime(rua):
    weekDay=rua[0]
    temp=rua[1::].split('-')
    sorted(temp)
    result=weekDay+temp[0]+'-'+temp[1]
    return result


x=5
try:
    x=x/0
except Exception as error:
    print(error)
