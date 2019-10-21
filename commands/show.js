import CommandStructure from '../structures/command';

class ShowCommand extends CommandStructure {
    constructor(client) {
        super(client, {
            description: 'Get information about a TV show.',
            usage: '<TV Show Name or ID>',
            flags: false,
            visible: true,
            developerOnly: false,
            weight: 500
        });
    }

    async executeCommand(message) {
        if (!message.arguments[0]) return this.usageMessage(message);
        const query = message.arguments.join(' ');

        const status = await this.searchingMessage(message);

        const TVShow = await this.tmdb.getTVShow(query);
        if (TVShow.error) return this.embed.error(status, TVShow.error);

        this.embed.edit(status, {
            url: this.tmdbShowURL(TVShow.id),
            title: TVShow.name,
            description: this.description(TVShow.overview),

            thumbnail: this.thumbnail(TVShow.poster_path),

            fields: this.parseEmbedFields([
                { name: 'Status', value: TVShow.status },
                { name: 'Type', value: this.type(TVShow.type) },
                { name: 'Episode Runtime', value: this.epRuntime(TVShow.episode_run_time) },
                { name: 'In Production', value: this.yesno(TVShow.in_production) },
                { name: 'First Air Date', value: this.releaseDate(TVShow.first_air_date) },
                { name: 'Last Air Date', value: this.releaseDate(TVShow.last_air_date) },
                { name: 'Genres', value: this.genres(TVShow.genres), inline: false },
                { name: 'Created By', value: this.createdBy(TVShow.created_by) },
                { name: 'Networks', value: this.networks(TVShow.networks) },
                { name: 'Homepage', value: this.homepage(TVShow.homepage), inline: false },
                { name: 'Vote Average', value: this.voteAverage(TVShow.vote_average) },
                { name: 'Votes', value: this.voteCount(TVShow.vote_count) },
                { name: 'Season Count', value:
                    `${this.seasonCount(TVShow.seasons)} (${this.episodeCount(TVShow.seasons)} Episodes)` },
                { name: 'TMDb ID', value: this.TMDbID(TVShow.id)
            }]),

            footer: message.db.guild.tips ? `TIP: Not the TV show you wanted? ` +
                `Try searching for it using the ${message.db.guild.prefix}shows command.` : ''
        });
    }
}

export default ShowCommand;
