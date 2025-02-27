pipeline {
    agent any

    environment {
        IMAGE_NAME = 'zoroz_ecommerce_image'
        CONTAINER_NAME = 'zoroz_ecommerce_container'
        GITHUB_REPO = 'https://github.com/myprofile-karan/zoroz_ecommerce.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${GITHUB_REPO}", branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'  // Install JavaScript/TypeScript dependencies
            }
        }

        stage('Build and Transpile') {
            steps {
                bat 'npm run build'  // TypeScript transpilation (if applicable)
                bat 'npm run compile'  // SCSS compilation (if applicable)
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'  // Run tests (if applicable)
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'  // Build Docker image
            }
        }

        // stage('Push to DockerHub') {
          //  steps {
             //   withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
               //     sh 'docker push $IMAGE_NAME'  // Push the image to DockerHub (if required)
             //   }
          //  }
      //  }

       // stage('Deploy to Vercel') {
       //     steps {
                // Deploy to Vercel
            //    bat 'npx vercel --prod --token YOUR_VERCEL_TOKEN'
          //  }
      //  }
    }
}
