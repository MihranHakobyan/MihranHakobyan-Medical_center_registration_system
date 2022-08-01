Medical_center_registration_system

This program  is for queue management in medical centers.

program functionality
      1․Doctor can register and login․
      2․Doctor can logins and see registered patients.
      3․User can see doctors list and theirs working hours. 
      4․The user can register with the doctor during the free and working hours of the doctor․
      5․Upon registration, the user will receive an email․
      6․Օne day before the day of registration, the user will receive a reminder letter about registration
      
      
request URL
      1.for doctor's registration -------------> http://localhost:3000/api/v1/auth/sign-in 
      2․for doctor's login --------------------> http://localhost:3000/api/v1/auth/login
      3․to add a new work day ------------------> http://localhost:3000/api/v1/doc/add
      4.doctor to see his patients ------------> http://localhost:3000/api/v1/doc
      5․to see information about all doctors---> http://localhost:3000/api/v1/doc/all
      6․for patient registration---------------> http://localhost:3000/api/v1/registration
      
the request must have  

     1․for doctor's registration----------> Doctor's data are:
                     - full_name
                     - email
                     - position
                     - working day 
                     - start(start of work)
                     - end (end of work)
                     - password
                     
     2.for doctor's login----------------> Doctor's data are:
                     - email
                     -password
                     
     3.for add a new work day------------> data are:
                     - working_day
                     - start
                     - end
                     - Doctor must be authenticated
                     
     4.for see his patients-------------> 
                     - Doctor must be authenticated
                
     5․for patient registration---------> data are:
                     - name
                     - surname
                     - email
                     - doctoId
                     - date
                      
