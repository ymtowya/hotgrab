import random


max_chunk_size = 1024

total_addr_space = 1024 * 16

def doAlloc():
    if random.random() < 0.5:
        return True
    return False

def getSpaceSize():
    return max_chunk_size * random.random()


for i in range(100):
    miss_rate = 0
    if doAlloc():
        re = myAlloc(getSpaceSize())
        if (re == -1) :
            







