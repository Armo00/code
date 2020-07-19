import os
import threading


def startData_Add():
    os.system('python kkk/1.py')
    
s = threading.Thread(target=startData_Add)
s.start()
