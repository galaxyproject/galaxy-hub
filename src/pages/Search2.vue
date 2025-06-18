<template>
    <Layout>
        <div class="search-page container">
            <h1 class="page-title">🔍 Search News &amp; Events</h1>

            <div class="filters">
                <!-- Title Search -->
                <div class="filter full-width">
                    <label for="title-search">Title</label>
                    <input id="title-search" v-model="titleSearch" type="text" placeholder="Type to search titles" />
                </div>

                <!-- Date Range Filter -->
                <div class="filter">
                    <label for="date-start">From Date</label>
                    <input id="date-start" v-model="dateStart" type="date" />
                </div>
                <div class="filter">
                    <label for="date-end">To Date</label>
                    <input id="date-end" v-model="dateEnd" type="date" />
                </div>

                <!-- Tags Filter -->
                <div class="filter">
                    <label for="tag-search">Tags</label>
                    <input id="tag-search" v-model="tagSearch" type="text" placeholder="Type to filter tags" />
                    <div class="options-list">
                        <label v-for="tag in filteredUniqueTags" :key="tag" class="option">
                            <input type="checkbox" :value="tag" v-model="selectedTags" />
                            {{ tag }}
                        </label>
                    </div>
                </div>

                <!-- Subsites Filter -->
                <div class="filter">
                    <label for="subsite-search">Subsites</label>
                    <input
                        id="subsite-search"
                        v-model="subsiteSearch"
                        type="text"
                        placeholder="Type to filter subsites"
                    />
                    <div class="options-list">
                        <label v-for="site in filteredUniqueSubsites" :key="site" class="option">
                            <input type="checkbox" :value="site" v-model="selectedSubsites" />
                            {{ site }}
                        </label>
                    </div>
                </div>

                <!-- Author Filter -->
                <div class="filter">
                    <label for="author-search">Author</label>
                    <input id="author-search" v-model="authorSearch" type="text" placeholder="Type to filter authors" />
                    <div class="options-list">
                        <label v-for="auth in filteredUniqueAuthors" :key="auth" class="option">
                            <input type="checkbox" :value="auth" v-model="selectedAuthors" />
                            {{ auth }}
                        </label>
                    </div>
                </div>

                <!-- Supporter Filter -->
                <div class="filter">
                    <label for="supporter-search">Supporters</label>
                    <input
                        id="supporter-search"
                        v-model="supporterSearch"
                        type="text"
                        placeholder="Type to filter supporters"
                    />
                    <div class="options-list">
                        <label v-for="sup in filteredUniqueSupporters" :key="sup" class="option">
                            <input type="checkbox" :value="sup" v-model="selectedSupporters" />
                            {{ sup }}
                        </label>
                    </div>
                </div>
            </div>

            <!-- Results -->
            <div class="results" v-if="filteredPosts.length">
                <div v-for="post in filteredPosts" :key="post.path" class="post-card">
                    <h2>
                        <g-link :to="post.path">{{ post.title }}</g-link>
                    </h2>
                    <p class="tease">{{ post.tease }}</p>
                    <p class="meta">
                        <span v-if="post.authors">By {{ post.authors }}</span>
                        <span v-else-if="post.contact">By {{ post.contact }}</span>
                        <span> • {{ formatDate(post.date) }}</span
                        ><br />
                        <span v-if="post.tags">Tags: {{ post.tags.join(", ") }}</span
                        ><br />
                        <span v-if="post.subsites">Subsites: {{ post.subsites.join(", ") }}</span
                        ><br />
                        <span v-if="post.supporters">Supporters: {{ post.supporters.join(", ") }}</span>
                    </p>
                </div>
            </div>
            <p v-else class="no-results">No posts match your filters.</p>
        </div>
    </Layout>
</template>

<script>
export default {
    name: "SearchPage",
    data() {
        return {
            // Filter selections
            selectedTags: [],
            selectedSubsites: [],
            selectedAuthors: [],
            selectedSupporters: [],
            // Search inputs
            titleSearch: "",
            tagSearch: "",
            subsiteSearch: "",
            authorSearch: "",
            supporterSearch: "",
            dateStart: "",
            dateEnd: "",
        };
    },
    computed: {
        posts() {
            return this.$page.allArticle.edges
                .map((e) => e.node)
                .filter((n) => ["news", "events"].includes(n.category));
        },
        uniqueTags() {
            return [...new Set(this.posts.flatMap((p) => p.tags || []))].sort();
        },
        uniqueSubsites() {
            return [...new Set(this.posts.flatMap((p) => p.subsites || []))].sort();
        },
        uniqueAuthors() {
            return [...new Set(this.posts.flatMap((p) => [p.authors, p.contact].filter(Boolean)))].sort();
        },
        uniqueSupporters() {
            return [...new Set(this.posts.flatMap((p) => p.supporters || []))].sort();
        },
        filteredUniqueTags() {
            return this.uniqueTags.filter((t) => t.toLowerCase().includes(this.tagSearch.toLowerCase()));
        },
        filteredUniqueSubsites() {
            return this.uniqueSubsites.filter((s) => s.toLowerCase().includes(this.subsiteSearch.toLowerCase()));
        },
        filteredUniqueAuthors() {
            return this.uniqueAuthors.filter((a) => a.toLowerCase().includes(this.authorSearch.toLowerCase()));
        },
        filteredUniqueSupporters() {
            return this.uniqueSupporters.filter((s) => s.toLowerCase().includes(this.supporterSearch.toLowerCase()));
        },
        filteredPosts() {
            return this.posts.filter((p) => {
                // Title filter
                if (this.titleSearch && !p.title.toLowerCase().includes(this.titleSearch.toLowerCase())) {
                    return false;
                }
                // Date range filter
                const postDate = new Date(p.date);
                if (this.dateStart) {
                    const start = new Date(this.dateStart);
                    if (postDate < start) return false;
                }
                if (this.dateEnd) {
                    const end = new Date(this.dateEnd);
                    if (postDate > end) return false;
                }
                // Tags
                if (this.selectedTags.length && !(p.tags && this.selectedTags.every((t) => p.tags.includes(t))))
                    return false;
                // Subsites
                if (
                    this.selectedSubsites.length &&
                    !(p.subsites && this.selectedSubsites.every((s) => p.subsites.includes(s)))
                )
                    return false;
                // Authors
                if (
                    this.selectedAuthors.length &&
                    !(
                        (p.authors && this.selectedAuthors.includes(p.authors)) ||
                        (p.contact && this.selectedAuthors.includes(p.contact))
                    )
                )
                    return false;
                // Supporters
                if (
                    this.selectedSupporters.length &&
                    !(p.supporters && this.selectedSupporters.every((s) => p.supporters.includes(s)))
                )
                    return false;
                return true;
            });
        },
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        },
    },
};
</script>

<page-query>
query SearchPosts {
  allArticle {
    edges {
      node {
        title
        tease
        date
        path
        category
        tags
        subsites
        authors
        contact
        supporters
      }
    }
  }
}
</page-query>

<style scoped lang="scss">
.search-page {
    .page-title {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
    }
    .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .filter {
        display: flex;
        flex-direction: column;
        &.full-width {
            grid-column: span 2;
        }
        label {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #34495e;
        }
        input[type="text"],
        input[type="date"] {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 0.5rem;
        }
        .options-list {
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #eee;
            padding: 0.5rem;
            border-radius: 4px;
        }
        .option {
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;
            input[type="checkbox"] {
                margin-right: 0.5rem;
            }
        }
    }
    .results {
        .post-card {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: transform 0.2s;
            &:hover {
                transform: translateY(-2px);
            }
            h2 {
                margin: 0 0 0.5rem;
                color: #1a242f;
            }
            .tease {
                margin: 0.75rem 0;
                color: #4a6582;
            }
            .meta {
                font-size: 0.875rem;
                color: #657786;
                margin-top: 0.5rem;
                span {
                    display: block;
                }
            }
        }
        .no-results {
            font-style: italic;
            color: #888;
        }
    }
}
</style>
