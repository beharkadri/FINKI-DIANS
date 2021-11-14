import json
  
# the file to be converted
filename = 'healthcare_objects_filtered.txt'
  
# resultant dictionary
dict1 = {}
  
# fields in the sample file 
fields =['id', 'longitude', 'latitude', 'amenity', 'name', 'city']
  
with open(filename, encoding="utf8") as fh:
    # count variable for employee id creation
    l = 1
      
    for line in fh:
        # reading line by line from the text file
        description = list( line.strip().split("\t"))
        # for output see below
        print(description) 
        # for automatic creation of id for each employee
        sno ='hco'+str(l)
      
        # loop variable
        i = 0
        # intermediate dictionary
        dict2 = {}
        while i<len(fields):
              
                # creating dictionary for each employee
                if i>=len(description):
                    dict2[fields[i]]= ""
                else:
                    dict2[fields[i]]= description[i]
                i = i + 1
                  
        # appending the record of each employee to
        # the main dictionary
        dict1[sno]= dict2
        l = l + 1
# creating json file        
out_file = open("healthcare_objects_filtered.json", "w", encoding="utf-8")
json.dump(dict1, out_file, indent = 4, ensure_ascii=False)
out_file.close()