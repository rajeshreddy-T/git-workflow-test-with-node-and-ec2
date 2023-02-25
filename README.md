<!-- CI/CD implementation with git workflows  to ec2 instance-->

# NodeAPP_v1

This is a simple NodeJS application that is used to demonstrate CI/CD implementation with git workflows.

## Prerequisites
how to create an ec2 instance
how to create a github repository

## Step 1: Create a github repository
fork this repository to your github account

## Step 2: Create an ec2 instance
    create an ec2 instance with the following configurations
    1. AMI: Ubuntu Server 20.04 LTS (HVM), SSD Volume Type   <!-- please choose ubuntu only for this case because the below commands are return specific to ubuntu -->
    2. Instance Type: t2.small
    3. Network: default
    4. Subnet: default
    5. Auto-assign Public IP: Enable
    6. Security Group: create a new security group with the following rules
        1. SSH: 22
        2. HTTP: 80
        3. HTTPS: 443
    7. Key Pair: create a new key pair
    8. Create an Elastic IP address and associate it with the ec2 instance


## Step 3: setup the ec2 instance with the following commands
    connect to the ec2 instance using the key pair created in step 2
    ```bash
    ssh -i "keypair.pem" ubuntu@<hostip>.compute-1.amazonaws.com
    ```

    next install the webserver, nodejs, npm, and git
    ```bash
    sudo apt update
    sudo apt install nginx
    ```
    adjust firewall settings
    ```bash
    sudo ufw app list

    sudo ufw allow 'Nginx HTTP'
    sudo ufw allow 'Nginx HTTPS'
    or 
    sudo ufw allow 'Nginx Full'

    sudo ufw status
    sudo ufw enable
    ```


    after the above steps, you can access the ec2 instance using the elastic ip address created in step 2
    type the elastic ip address in the browser and you should see the default nginx page


    <!-- create a reverse proxy from port 80 to port 3000-->
    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```
    add the following lines to the file
    ```bash
    server {
        listen 80;
        server_name _;
        location / {
            proxy_pass http://localhost:3000;
        }
    }
    ```
    test nginx configuration
    ```bash
    sudo nginx -t
    ```

    restart the nginx service because we have made changes to the server configuration

    ```bash
    sudo systemctl restart nginx
    ```

    if your type the elastic ip address in the browser, you will see bad gateway error because we have not started the nodejs application yet


## Step 4: install node and pm2 with nvm
    install nvm
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    source ~/.profile
    ```

    install nodejs
    ```bash
    nvm install 14
    ```

    install pm2
    ```bash
    npm install pm2 -g
    ```

   create symbolic links for node and npm and pm2
    ```bash       
        sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"

        sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"

        sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/pm2" "/usr/local/bin/pm2"
    ```

    clone the github repository to the ec2 instance
    ```bash
    git clone

## Step 5: Steps to create a CI/CD pipeline in Github actions
add the aws private key to the github secrets following the below steps
 ```bash
    1. go to the github repository 
    2. click on settings
    3. click on secrets
    4. click on new repository secret
    5. add the following secrets
        ssh_private_key: add the private key of the ec2 instance created in step 2
        ssh_host: add the elastic ip address of the ec2 instance created in step 2
        ssh_username: add the username of the ec2 instance created in step 2
        ssh_port: add the port number of the ec2 instance created in step 2

```
create a workflow file
    1. go to the github repository
    2. click on actions
    3. click on set up a workflow yourself
    4. add the code present in cicdWorkflow.yml file to the workflow file
    5. commit the changes to the main branch
    6. go to the github repository   
    7. click on actions
    8. click on the workflow file
    9. click on the run workflow button
    10. click on the workflow run
    11. click on the job
    12. click on the step
    13. click on the view logs button
    14. you should see the following output
    ```    




