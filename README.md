# DYNAMIC LOAD BALANCER INTEGRATION
# Load Balancer and Cafe Website Setup

- [Load Balancer and Cafe Website Setup](#load-balancer-and-cafe-website-setup)
  - [Load Balancer Server](#load-balancer-server)
    - [1. Create Load Balancer Server](#1-create-load-balancer-server)
    - [2. Configure NGINX as Load Balancer](#2-configure-nginx-as-load-balancer)
  - [Backend Servers](#backend-servers)
    - [3. Set Up Backend Servers](#3-set-up-backend-servers)
    - [Accessing the Cafe Website](#accessing-the-cafe-website)
      - [4. Access the Load Balanced Cafe Website](#4-access-the-load-balanced-cafe-website)
      - [5. Testing Load Balancing](#5-testing-load-balancing)
  - [Contribution](#contribution)

## Load Balancer Server:

### 1. Create Load Balancer Server:

- Set up a new server instance (virtual machine or physical server) to act as the load balancer.
- Install NGINX on the load balancer server:

    ```bash
    sudo apt-get update
    sudo apt-get install nginx
    ```

### 2. Configure NGINX as Load Balancer:

- Open NGINX configuration file:

    ```bash
    sudo nano /etc/nginx/nginx.conf
    ```

- Update the `http` block to include the upstream servers:

    ```nginx
    http {
        upstream my_servers {
            server backend_server1_ip;
            server backend_server2_ip;
            server backend_server3_ip;
        }

        # ... (other configurations)

        server {
            listen 80;

            location / {
                proxy_pass http://my_servers;
            }
        }
    }
    ```

- Replace `backend_server1_ip`, `backend_server2_ip`, and `backend_server3_ip` with the actual IP addresses of your backend servers.
- Save the configuration and restart NGINX:

    ```bash
    sudo service nginx restart
    ```

## Backend Servers:

### 3. Set Up Backend Servers:

- Create multiple backend servers (e.g., using virtual machines or separate physical servers).
- Install NGINX on each backend server:

    ```bash
    sudo apt-get update
    sudo apt-get install nginx
    ```

- Copy the cafe website HTML files to each backend server:

    ```bash
    scp -r /path/to/local/cafe-website/html user@backend_server_ip:/path/to/remote/cafe-website/
    ```

- Ensure NGINX is configured to serve the cafe website. Update the server block in `/etc/nginx/sites-available/default` or create a new configuration file:

    ```nginx
    server {
        listen 80;
        server_name backend_server_ip;

        location / {
            root /path/to/remote/cafe-website/html;
            index index.html;
        }
    }
    ```

- Save the configuration and restart NGINX:

    ```bash
    sudo service nginx restart
    ```

### Accessing the Cafe Website:

#### 4. Access the Load Balanced Cafe Website:

- Open a web browser and navigate to the IP address of the load balancer server (or the domain if you have one):

    ```text
    http://load_balancer_ip
    ```

- NGINX on the load balancer will distribute requests among the backend servers.

#### 5. Testing Load Balancing:

- To test load balancing, use tools like Apache Benchmark (`ab`) from the load balancer server:

    ```bash
    ab -n 1000 -c 10 http://load_balancer_ip/
    ```

- Adjust the number of requests (`-n`) and concurrency (`-c`) based on your testing needs.

## Contribution

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.
