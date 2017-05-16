---
 title: Metadata
---
[Back to Support Hub](/src/support/index.md)

## Metadata Explained

** Coming soon!! Use the pre-existing content below with caution **

### Example: Dataset metadata missing or incomplete



*   **How to notice if this is a problem**

    *   The dataset will not download when using the disk icon
    *   Tools error when using a specific dataset that has been used before successfully
    *   Tools error with a message that ends with: `OSError: [Errno 2] No such file or directory`. Note that not all failures of this type are due to metadata and may simply be a cluster failure - rerunning the job may resolve the problem instead, but try the solution first.

*   **Solution**

    *   Reset the metadata on the dataset(s). This may be an uploaded dataset or one created by prior tools. It could be one of the input datasets to a failed job.
        *   How to: Click on the _**Auto-detect**_ button found near the bottom of the _**Edit Attributes**_ form for the dataset. Reach this form using the dataset's ![pencil](/src/images/icons/pencil.png "pencil") icon.

*   **If this does not resolve the problem**

    *   If resetting metadata does fix the issue, then there may have been a transient cluster job failure. Re-run the job at least once.
*   **Other problematic dataset solutions are listed here**, but these are not are not based on the same underlying issue.

    *   [Tool doesn't recognize dataset](/src/support#tool-doesn.27t-recognize-dataset)

    *   [FASTQ Datatype QA](/src/support#fastq-datatype-qa)

    *   [Troubleshooting errors from tools](/src/support#error-from-toolstroubleshooting-errors-from-tools) - Includes how to check your data inputs and diagnose memory and other failure reasons.

