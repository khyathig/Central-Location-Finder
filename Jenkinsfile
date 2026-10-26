pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        DOCKERHUB_USER = 'khyathig'

        BACKEND_IMAGE = 'khyathig/clf-backend'
        FRONTEND_IMAGE = 'khyathig/clf-frontend'

        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm ci'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh 'npm test'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'CI=true npm test -- --watchAll=false --passWithNoTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(env.FRONTEND_DIR) {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build --pull -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./${BACKEND_DIR}"
                sh "docker build --pull -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./${FRONTEND_DIR}"

                sh "docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest"
                sh "docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        printf '%s' "$DOCKER_PASSWORD" |
                            docker login --username "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${BACKEND_IMAGE}:latest"

                sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${FRONTEND_IMAGE}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl config current-context'
                sh 'kubectl get nodes'
        
                // Apply the Kubernetes manifests
                sh 'kubectl apply -f k8s/'
        
                // Update the images using the actual container names
                sh "kubectl set image deployment/clf-backend backend=${BACKEND_IMAGE}:${BUILD_NUMBER}"
                sh "kubectl set image deployment/clf-frontend frontend=${FRONTEND_IMAGE}:${BUILD_NUMBER}"
        
                // Wait for deployments to become ready
                sh 'kubectl rollout status deployment/clf-mongo --timeout=180s'
                sh 'kubectl rollout status deployment/clf-backend --timeout=180s'
                sh 'kubectl rollout status deployment/clf-frontend --timeout=180s'
        
                // Verify the deployment
                sh 'kubectl get deployments'
                sh 'kubectl get pods'
                sh 'kubectl get services'
            }
        }
    }

    post {
        success {
            echo "Successfully built and pushed ${BACKEND_IMAGE}:${BUILD_NUMBER} and ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
            echo 'Kubernetes deployment completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Review the Jenkins Console Output for the failing stage.'
        }

        always {
            echo 'Central Location Finder pipeline execution finished.'
        }
    }
}
