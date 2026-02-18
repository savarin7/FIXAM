pipeline {
    agent any

    tools {
        nodejs('Node')
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
                    echo '📦 Installing backend dependencies using npm ci...'
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

        stage('Deploy with Docker Compose') {
            environment {
                NODE_ENV = 'production'
            }
            steps {
                dir('backend') {
                    agent {
                        docker {
                            image 'node:22.22.0'
                            // Run the container on the node specified at the
                            // top-level of the Pipeline, in the same workspace,
                            // rather than on a new node entirely:
                            reuseNode true
                        }
                    }
                }
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
 