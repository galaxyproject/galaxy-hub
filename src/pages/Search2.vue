<template>
    <Layout>
        <div class="search-page container">
            <h1 class="page-title">🔍 Search News &amp; Events</h1>

            <div class="filters">
                <!-- Title Search -->
                <div class="filter full-width">
                    <label for="title-search">Title</label>
                    <input
                        id="title-search"
                        v-model.lazy="titleSearch"
                        type="text"
                        placeholder="Type to search titles"
                    />
                </div>

                <!-- Date Range Filter -->
                <div class="filter">
                    <label for="date-start">From Date</label>
                    <input id="date-start" v-model.lazy="dateStart" type="date" />
                </div>
                <div class="filter">
                    <label for="date-end">To Date</label>
                    <input id="date-end" v-model.lazy="dateEnd" type="date" />
                </div>

                <!-- Tags Filter -->
                <div class="filter">
                    <label for="tag-search">Tags</label>
                    <input id="tag-search" v-model.lazy="tagSearch" type="text" placeholder="Type to filter tags" />
                    <div class="options-list">
                        <label v-for="tag in displayedTags" :key="tag" class="option">
                            <input type="checkbox" :value="tag" v-model="selectedTags" />
                            {{ tag }}
                        </label>
                        <button
                            v-if="filteredUniqueTags.length > tagDisplayLimit"
                            @click="showAllTags = !showAllTags"
                            class="show-toggle"
                        >
                            {{ showAllTags ? "Show less" : "Show more" }}
                        </button>
                    </div>
                </div>

                <!-- Subsites Filter -->
                <div class="filter">
                    <label for="subsite-search">Subsites</label>
                    <input
                        id="subsite-search"
                        v-model.lazy="subsiteSearch"
                        type="text"
                        placeholder="Type to filter subsites"
                    />
                    <div class="options-list">
                        <label v-for="site in displayedSubsites" :key="site" class="option">
                            <input type="checkbox" :value="site" v-model="selectedSubsites" />
                            {{ site }}
                        </label>
                        <button
                            v-if="filteredUniqueSubsites.length > subsitesDisplayLimit"
                            @click="showAllSubsites = !showAllSubsites"
                            class="show-toggle"
                        >
                            {{ showAllSubsites ? "Show less" : "Show more" }}
                        </button>
                    </div>
                </div>

                <!-- Author Filter -->
                <div class="filter">
                    <label for="author-search">Author</label>
                    <input
                        id="author-search"
                        v-model.lazy="authorSearch"
                        type="text"
                        placeholder="Type to filter authors"
                    />
                    <div class="options-list">
                        <label v-for="auth in displayedAuthors" :key="auth" class="option">
                            <input type="checkbox" :value="auth" v-model="selectedAuthors" />
                            {{ auth }}
                        </label>
                        <button
                            v-if="filteredUniqueAuthors.length > authorsDisplayLimit"
                            @click="showAllAuthors = !showAllAuthors"
                            class="show-toggle"
                        >
                            {{ showAllAuthors ? "Show less" : "Show more" }}
                        </button>
                    </div>
                </div>

                <!-- Supporter Filter -->
                <div class="filter">
                    <label for="supporter-search">Supporters</label>
                    <input
                        id="supporter-search"
                        v-model.lazy="supporterSearch"
                        type="text"
                        placeholder="Type to filter supporters"
                    />
                    <div class="options-list">
                        <label v-for="sup in displayedSupporters" :key="sup" class="option">
                            <input type="checkbox" :value="sup" v-model="selectedSupporters" />
                            {{ sup }}
                        </label>
                        <button
                            v-if="filteredUniqueSupporters.length > supportersDisplayLimit"
                            @click="showAllSupporters = !showAllSupporters"
                            class="show-toggle"
                        >
                            {{ showAllSupporters ? "Show less" : "Show more" }}
                        </button>
                    </div>
                </div>

                <!-- Apply Filters Button -->
                <div class="filter-actions full-width">
                    <button @click="applyFilters" class="btn btn-primary">Search</button>
                </div>
            </div>

            <!-- Results -->
            <div class="results" v-if="results.length">
                <div v-for="post in results" :key="post.path" class="post-card">
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
import Fuse from "fuse.js";

export default {
    name: "SearchPage",
    data() {
        return {
            // filter selections
            selectedTags: [],
            selectedSubsites: [],
            selectedAuthors: [],
            selectedSupporters: [],
            // search inputs
            titleSearch: "",
            tagSearch: "",
            subsiteSearch: "",
            authorSearch: "",
            supporterSearch: "",
            dateStart: "",
            dateEnd: "",
            // results and static lists
            results: [],
            normalizedPosts: [],
            allTags: [],
            allSubsites: [],
            allAuthors: [],
            allSupporters: [],
            // display toggles
            showAllTags: false,
            showAllSubsites: false,
            showAllAuthors: false,
            showAllSupporters: false,
            tagDisplayLimit: 10,
            subsitesDisplayLimit: 10,
            authorsDisplayLimit: 10,
            supportersDisplayLimit: 10,
            // fuzzy index
            fuse: null,
        };
    },
    created() {
        // cache posts
        this.normalizedPosts = this.$page.allArticle.edges
            .map((e) => e.node)
            .filter((n) => ["news", "events"].includes(n.category));
        // static unique lists and lowercase caches
        this.allTags = Array.from(new Set(this.normalizedPosts.flatMap((p) => p.tags || []))).sort();
        this.allTagsLower = this.allTags.map((t) => t.toLowerCase());
        this.allSubsites = Array.from(new Set(this.normalizedPosts.flatMap((p) => p.subsites || []))).sort();
        this.allSubsitesLower = this.allSubsites.map((s) => s.toLowerCase());
        this.allAuthors = Array.from(
            new Set(this.normalizedPosts.flatMap((p) => [p.authors, p.contact].filter(Boolean))),
        ).sort();
        this.allAuthorsLower = this.allAuthors.map((a) => a.toLowerCase());
        this.allSupporters = Array.from(new Set(this.normalizedPosts.flatMap((p) => p.supporters || []))).sort();
        this.allSupportersLower = this.allSupporters.map((s) => s.toLowerCase());
        // initialize fuse index for title
        this.fuse = new Fuse(
            this.normalizedPosts.map((p) => ({ ...p, _lcTitle: p.title.toLowerCase() })),
            { keys: ["_lcTitle"], threshold: 0.3 },
        );
        // initial results
        this.results = [...this.normalizedPosts];
    },
    computed: {
        // lightweight filtering on precomputed arrays
        filteredUniqueTags() {
            const term = this.tagSearch.toLowerCase();
            return this.allTags.filter((t, i) => this.allTagsLower[i].includes(term));
        },
        filteredUniqueSubsites() {
            const term = this.subsiteSearch.toLowerCase();
            return this.allSubsites.filter((s, i) => this.allSubsitesLower[i].includes(term));
        },
        filteredUniqueAuthors() {
            const term = this.authorSearch.toLowerCase();
            return this.allAuthors.filter((a, i) => this.allAuthorsLower[i].includes(term));
        },
        filteredUniqueSupporters() {
            const term = this.supporterSearch.toLowerCase();
            return this.allSupporters.filter((s, i) => this.allSupportersLower[i].includes(term));
        },
        displayedTags() {
            return this.showAllTags ? this.filteredUniqueTags : this.filteredUniqueTags.slice(0, this.tagDisplayLimit);
        },
        displayedSubsites() {
            return this.showAllSubsites
                ? this.filteredUniqueSubsites
                : this.filteredUniqueSubsites.slice(0, this.subsitesDisplayLimit);
        },
        displayedAuthors() {
            return this.showAllAuthors
                ? this.filteredUniqueAuthors
                : this.filteredUniqueAuthors.slice(0, this.authorsDisplayLimit);
        },
        displayedSupporters() {
            return this.showAllSupporters
                ? this.filteredUniqueSupporters
                : this.filteredUniqueSupporters.slice(0, this.supportersDisplayLimit);
        },
    },
    methods: {
        applyFilters() {
            let base = [...this.normalizedPosts];
            // fuzzy title
            if (this.titleSearch) {
                const fuseRes = this.fuse.search(this.titleSearch);
                base = fuseRes.map((r) => r.item);
            }
            this.results = base.filter((p) => {
                // date
                let ok = true;
                if (this.dateStart) ok = new Date(p.date) >= new Date(this.dateStart);
                if (ok && this.dateEnd) ok = new Date(p.date) <= new Date(this.dateEnd);
                if (!ok) return false;
                // tags
                if (this.selectedTags.length && !(p.tags && this.selectedTags.some((t) => p.tags.includes(t))))
                    return false;
                // subsites
                if (
                    this.selectedSubsites.length &&
                    !(p.subsites && this.selectedSubsites.some((s) => p.subsites.includes(s)))
                )
                    return false;
                // authors
                if (
                    this.selectedAuthors.length &&
                    !(
                        (p.authors && this.selectedAuthors.includes(p.authors)) ||
                        (p.contact && this.selectedAuthors.includes(p.contact))
                    )
                )
                    return false;
                // supporters
                if (
                    this.selectedSupporters.length &&
                    !(p.supporters && this.selectedSupporters.some((s) => p.supporters.includes(s)))
                )
                    return false;
                return true;
            });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
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
        margin-bottom: 1rem;
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
            max-height: 200px;
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
        .show-toggle {
            background: none;
            border: none;
            color: #007acc;
            text-decoration: underline;
            cursor: pointer;
            margin-top: 0.25rem;
        }
    }
    .filter-actions {
        grid-column: span 2;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
        .btn {
            padding: 0.5rem 1rem;
            font-size: 1rem;
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
