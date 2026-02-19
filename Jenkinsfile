pipeline {
    agent any

    tools {
        nodejs('Node')
    }

    environment {
        // Reference the credentials ID created in Jenkins
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        REGISTRY_URL = 'index.docker.io' // Default for Docker Hub
        IMAGE_NAME = 'hudson7/neoserver'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo '📦 Installing backend dependencies........'
                    sh 'npm ci'   // Better for CI than npm install
                }
            }
        }

        stage('DEBUG WORKSPACE') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Run Unit Tests') {
            environment {
                CI = 'true'
            }
            steps {
                dir('backend') {
                    sh 'npm run test:ci'
                }
            }
        }

        stage('build image'){
            steps {
                script {
                    // Build the Docker image using the Dockerfile in the repo
                    dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    // Log in to Docker registry and push the image
                    docker.withRegistry("https://${REGISTRY_URL}", 'dockerhub-credentials') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push('v1')
                    }
                }
            }
        }

        stage('Deploy image') {
            steps {
                sh 'docker-compose up -d' // Example deployment command, adjust as needed
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline succeeded. Backend deployed!'
        }
        failure {
            echo '❌ Pipeline failed. Deployment skipped.'
        }
        always {
            echo '🧹 Cleaning workspace...'
            cleanWs()
        }
    }
}
 