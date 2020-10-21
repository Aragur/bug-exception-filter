# bug-exception-filter

This is a minimal repository for [#5592](https://github.com/nestjs/nest/issues/5592) on nestjs/nest  

## Getting Started
Install all dependencies by running
```
npm install
```
Run the Project by using
```
npm start
```

## Testing
Navigate to [localhost:8080](http://localhost:8080) and see if everything runs fine. (Should Return `Hello World!`)  
Now Navigate to [localhost:8080/error](http://localhost:8080/error) and check the logs. (Here you can see the duplicate output from `ApiErrorFilter`)