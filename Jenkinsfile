pipeline {
    agent any

    environment {
        IMAGE_NAME = 'zoroz_ecommerce_image'  // Name of your Docker image
        CONTAINER_NAME = 'zoroz_ecommerce_container'  // Name of your Docker container
        GITHUB_REPO = 'https://github.com/myprofile-karan/zoroz_ecommerce.git'  // Your GitHub repository URL
        VERCEL_TOKEN = credentials('vercel-token')  // Vercel token from Jenkins credentials
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from GitHub
                git url: "${GITHUB_REPO}", branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    bat 'npm install'  // Install JavaScript/TypeScript dependencies
                }
            }
        }

        stage('Build and Transpile') {
            steps {
                script {
                    echo 'Building and transpiling...'
                    bat 'npm run build'  // Run the build command (e.g., Next.js build)
                    bat 'npm run compile'  // TypeScript transpilation (if applicable)
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    bat 'npm test'  // Run tests (if applicable)
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    bat "docker build -t ${IMAGE_NAME} ."  // Build the Docker image
                }
            }
        }

        // Uncomment the following stages if you want to push the image to DockerHub and deploy to Vercel

        // stage('Push to DockerHub') {
        //     steps {
        //         withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
        //             bat "docker push ${IMAGE_NAME}"  // Push the image to DockerHub (if required)
        //         }
        //     }
        // }

        // stage('Deploy to Vercel') {
        //     steps {
        //         echo 'Deploying project to Vercel...'
        //         bat "npx vercel --prod --token ${VERCEL_TOKEN}"  // Deploy to Vercel
        //     }
        // }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean up any resources or temporary files if needed
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
