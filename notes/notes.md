# startup
This is for BYU CS260


### IP and Domain Stuff
- I have an elastic ip address for the website
- I need to buy a domiain

### Learning how to Deploy Online
- This is Important: ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup
- This is the version I use for simon: ./deployFiles.sh -k ~/Documents/cs260/keys/production.pem -h getdrixal.com -s simon
- This command is import when deploying files as well. scp -i ~/Documents/cs260/keys/production.pem draw.ht
ml ubuntu@getdrixal.com:/home/ubuntu/public_html/
draw.html

### React Notes and Changes

So I need to take notes on what I am doing so they see that I am not cheating. Basically what I am going to be doing is doing what I did on simon-css and do it on my application. I will create an individual file for each of the pages and create a react component. On the main app.jsx I will have a route that goes between each of the pages. 