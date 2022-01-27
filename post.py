import requests
import time

x1 = 0
x2 = 0
x3 = 0

for i in range(3000) :
  response = requests.post('http://localhost:3000/api/live/push/custom_stream_id', data='sma,sma=cpu5,host=smar usage_idle=82.17821782172511,usage_nice=0,usage_iowait=0,usage_steal=0,usage_user=13.861386138623223,usage_system=3.960396039606635,usage_irq=0,usage_softirq='+str(x1)+',usage_guest='+str(x2)+',usage_guest_nice='+str(x3), headers={'Authorization':'Bearer '+ 'eyJrIjoiMm03c0lXRWY0VGxrM0Vmd2hBelN6NWdtQ3ZSMHZLMTAiLCJuIjoidGVsIiwiaWQiOjF9'})
  x1+=1
  x2+=2
  x3+=3
  print(x1,x2,x3)
  print(response)
  time.sleep(0.4)
