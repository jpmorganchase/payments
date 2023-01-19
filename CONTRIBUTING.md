# How to contribute to JPMC Payments projects

We welcome your patches and enhancements to our projects.

## Contributing to JPMC Projects

If this is your first time contributing to JPMC codebases you will need to fill out our Contribution Licence Agreement (CLA). More information can be found at: https://github.com/jpmorganchase/.github/blob/main/CONTRIBUTING.md

## Updating submodules to latest commit

This project uses git submodules to link our projects together. To make a change to a project we recommend doing this in the original project repository.

Once you have updated your code in the original project repository and had it merged to the main branch, you can update the submodule to the latest commit with the below commands:

```console
git clone https://github.com/jpmorganchase/payments.git
cd payments
git checkout -b <your_branch_name>
cd <submodule_name>
git checkout main && git pull
cd ../
git add <submodule_name>
git commit -m "<your_commit_message>"
git push
```

Once this is complete, raise a PR on the payments repo and our team will review.
