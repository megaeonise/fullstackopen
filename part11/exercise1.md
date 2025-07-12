The hypothetical application is written in Java. It does not require any special considerations during CI.

For linting in Java, Checkstyle for Java and Sonarlint extensions in VS Code can be used. Checkstyle supports live linting and batch check. Sonarlint also supports live linting.
For testing in Java, Junit can be used. Junit is the most common unit testing library for Java and has integration with almost all programming environments.
For building in Java, the tools Gradle, Apache Maven or Apache Ant can be used. Maven is the industry standard and has a vast plugin library. Maven also has great dependency management and enforces conventions and standards for project structure and configuration. Gradle has more flexible and is more efficient and fast. It also has shorter build scripts compared to Maven. Ant is simple and easy to learn and does not enforce any specific project strucutres or configurations.

Besides Jenkins and Github Actions, tools that can be used to setup CI are as follows: - Bitbucket Pipelines - AWS CodePipeline - CircleCI - Azure Pipelines - GitLab - Atlassian Bamboo

This setup would be better in a cloud-based environment. This is because this application is not something that requires a self-hosted setup. While it is true that self-hosted setups with eg. Jenkins are quite flexible and offer a full control over all aspects of CI, it is also difficult and time-consuming to setup. As the application does not require special considerations during CI, cloud-based environment would be the better choice. The ease of use of cloud-based environment and the time saved from not having to setup a self-hosted setup is perfect for most use cases, which includes the use case of using CI for this hypothetical application.
